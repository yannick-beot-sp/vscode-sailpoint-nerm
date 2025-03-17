<script lang="ts">
  import { toast } from "svelte-sonner";
  import type { Role } from "src/model/Role";
  import type { User } from "src/model/User";
  import { CirclePlus, RotateCw, Sparkles, Trash2 } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import type { UserRolePair } from "src/model/UserRolePair";
  import Autocomplete from "$lib/components/combobox/combobox.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import Spinner from "$lib/components/Spinner.svelte";

  import type { Item } from "$lib/components/Item";
  import type { Client } from "src/services/Client";
  import { onMount } from "svelte";
  import { compare } from "$lib/utils/stringUtils";

  interface listItem<T> {
    original: T;
    status?: "Deleted" | "Added";
    new?: boolean;
  }

  type UserRolePairWithUserName = UserRolePair & {
    name: string;
  };

  interface Props {
    role: Role;
    client: Client;
  }

  /**
   * Safely concatenate name and email
   * @param user
   * @returns String with the format "name (email)"
   */
  function computeDisplayname(
    user: User | undefined,
    defaultValue: string = "N/A"
  ): string {
    if (!user) {
      return defaultValue;
    }
    const name = [user?.name, user?.email ? `(${user.email})` : undefined]
      .join(" ")
      .trim();

    if (!name) {
      return defaultValue;
    }
    return name;
  }

  let { role, client }: Props = $props();

  // Manage the display of the Spinner or the list
  let loading = $state(true);

  // list users for the given role
  let members: UserRolePair[] = $state([]);

  // All users
  let users = $state<User[]>([]);

  let updated = $state(false);

  // Map for fast matching by id
  let userMap = $derived.by(() => {
    let userMap = new Map<string, User>();
    users.forEach((x) => {
      userMap.set(x.id, x);
    });
    return userMap;
  });
  // Map to quickly check if a user is already a member
  let userRolesMap = $derived.by(() => {
    let userRolesMap = new Map<string, boolean>();
    members.forEach((x) => {
      userRolesMap.set(x.user_id, true);
    });
    return userRolesMap;
  });

  let items: listItem<UserRolePairWithUserName>[] = $state([]);

  let selectedUser = $state<string>();
  // Used by the select
  let userItems: Item[] = $derived(
    users
      .filter((x) => !userRolesMap.has(x.id))
      .map((x) => ({ label: x.name, value: x.id }))
      .sort((a, b) => compare(a.label, b.label))
  );

  function getItem(id: string): listItem<UserRolePairWithUserName> | undefined {
    return items.find((x) => id === x.original.id);
  }

  function handleDelete(id: string) {
    console.log(">handleDelete", id, $state.snapshot(items));
    const item = getItem(id);
    if (item) {
      item.status = "Deleted";
      updated = true;
    }
  }

  function handleRestore(id: string) {
    console.log(">handleRestore", id, $state.snapshot(items));
    const item = getItem(id);
    if (item) {
      item.status = "Added";
      updated = true;
    }
  }

  function handleAdd() {
    console.log(">handleAdd");
    if (selectedUser) {
      const user = userMap.get(selectedUser);
      items.push({
        original: {
          id: crypto.randomUUID(),
          uid: "0",
          user_id: selectedUser,
          role_id: role.id,
          name: computeDisplayname(user),
        },
        new: true,
        status: "Added",
      });
      users = users.filter((x) => x.id !== selectedUser);
      selectedUser = undefined;
      updated = true;
    }
  }
  async function save() {
    console.log(">save", items);
    const rolesToRemove = items.filter((x) => x.status === "Deleted" && !x.new);
    for (const element of rolesToRemove) {
      await client.removeUserRolePairing(element.original.id);
    }

    const rolesToAdd = items.filter((x) => x.status === "Added" && x.new);
    if (rolesToAdd.length > 0) {
      const newRoles = await client.addUserRolePairings(
        rolesToAdd.map((x) => ({
          user_id: x.original.user_id,
          role_id: x.original.role_id,
        }))
      );
      console.log({ newRoles, items });

      newRoles.forEach((newRole) => {
        const index = items.findIndex(
          (item) => newRole.user_id === item.original.user_id
        );
        if (index !== -1) {
          const newData = items[index];
          newData.original.id = newRole.id;
          newData.new = false;
          Object.assign(items[index], newData);
        }
      });
    }
    console.log({ items });

    items = items.filter((x) => x.status !== "Deleted");
    toast.success("Roles updated");
    updated = false;
  }
  async function getData(forceRefresh?: boolean) {
    loading = true;
    users = await client.getUsers(forceRefresh);
    members = await client.getUserRolePairings({ role_id: role.id });
    items = members
      .map((x) => {
        const user = userMap.get(x.user_id);
        console.log(user);

        return {
          original: {
            ...x,
            name: computeDisplayname(user),
          },
        };
      })
      .sort((a, b) => compare(a.original.name, b.original.name));
      loading = false;
  }

  onMount(async () => {
    await getData();
    
  });
</script>

<div class="flex flex-col mb-4">
  <Label class="label">Members</Label>

  <div class="flex gap-2 mb-4 mt-2 items-center">
    <Autocomplete items={userItems} bind:value={selectedUser} disabled={loading}/>
    <Button
      onclick={async () => getData(true)}
      size="icon"
      class="relative size-8 p-0"><RotateCw /></Button
    >
    <Button
      variant="ghost"
      size="icon"
      class="relative size-8 p-0"
      onclick={async () => handleAdd()}
      disabled={!selectedUser}
    >
      <CirclePlus class="text-success" />
    </Button>
  </div>
</div>
<div class="flex justify-center gap-3">
  <Spinner show={loading} />
</div>
{#if !loading}
  {#if items && items.length > 0}
    <ul role="list" class="divide-y divide-gray-100">
      {#each items as item}
        <li class="flex justify-between gap-x-6 py-2">
          <div
            class={[
              "flex",
              "min-w-0",
              "gap-x-4",
              item.status === "Deleted" && "deleted",
            ]}
          >
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6">{item.original.name}</p>
            </div>
            <span>
              {#if item.new}
                <Sparkles class="ml-1" />
              {/if}
            </span>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {#if item.status !== "Deleted"}
                <Button
                  variant="ghost"
                  size="icon"
                  class="relative size-8 p-0"
                  onclick={() => handleDelete(item.original.id)}
                >
                  <Trash2 class="text-destructive" />
                </Button>
              {:else}
                <Button
                  variant="ghost"
                  size="icon"
                  class="relative size-8 p-0"
                  onclick={() => handleRestore(item.original.id)}
                >
                  <CirclePlus class="text-success" />
                </Button>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="flex justify-center gap-3">No member</div>
  {/if}
{/if}
<Button onclick={save} class="mt-5" disabled={!updated}>Save</Button>

<style>
  .deleted {
    text-decoration: line-through;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }
</style>
