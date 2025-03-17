<script lang="ts">
  import { toast } from "svelte-sonner";
  import type { Role } from "src/model/Role";
  import type { User } from "src/model/User";
  import { CirclePlus, RotateCw, Sparkles, Trash2 } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import type { UserRolePair } from "src/model/UserRolePair";
  import Autocomplete from "$lib/components/combobox/combobox.svelte";
  import type { Item } from "$lib/components/Item";
  import type { Client } from "src/services/Client";
  import { onMount } from "svelte";
  import { compare } from "$lib/utils/stringUtils";

  interface listItem<T> {
    original: T;
    status?: "Deleted" | "Added";
    new?: boolean;
  }

  type UserRolePairWithRoleName = UserRolePair & {
    name: string;
  };

  interface Props {
    user: User;
    client: Client;
  }

  let { user, client }: Props = $props();

  let userRoles: UserRolePair[] = $state([]);

  let roles = $state<Role[]>([]);

  let updated = $state(false);

  let roleMap = $derived.by(() => {
    let roleMap = new Map<string, Role>();
    roles.forEach((x) => {
      roleMap.set(x.id, x);
    });
    return roleMap;
  });
  let userRolesMap = $derived.by(() => {
    let userRolesMap = new Map<string, UserRolePair>();
    userRoles.forEach((x) => {
      userRolesMap.set(x.role_id, x);
    });
    return userRolesMap;
  });

  let items: listItem<UserRolePairWithRoleName>[] = $state([]);

  let selectedRole = $state<string>();
  let roleItems: Item[] = $derived(
    roles
      .filter((x) => !userRolesMap.has(x.id))
      .map((x) => ({ label: x.name, value: x.id }))
      .sort((a, b) => compare(a.label, b.label))
  );

  function getItem(id: string): listItem<UserRolePairWithRoleName> | undefined {
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
    if (selectedRole) {
      const role = roleMap.get(selectedRole);
      items.push({
        original: {
          id: crypto.randomUUID(),
          uid: "0",
          user_id: user.id,
          role_id: selectedRole,
          name: role?.name ?? "",
        },
        new: true,
        status: "Added",
      });
      roles = roles.filter((x) => x.id !== selectedRole);
      selectedRole = undefined;
      updated = true;
    }
  }
  async function getData(forceRefresh?: boolean) {
    roles = await client.getRoles(forceRefresh);
    userRoles = await client.getUserRolePairings({ user_id: user.id });
    items = userRoles
      .map((x) => {
        const role = roleMap.get(x.role_id);
        return {
          original: {
            ...x,
            name: role?.name ?? "N/A",
          },
        };
      })
      .sort((a, b) => compare(a.original.name, b.original.name));
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
          user_id: user.id,
          role_id: x.original.role_id,
        }))
      );
      newRoles.forEach((newRole) => {
        const item = items.find((x) => newRole.role_id === x.original.role_id);
        if (item) {
          item.original.id = newRole.id;
          item.new = false;
        }
      });
    }

    items = items.filter((x) => x.status !== "Deleted");
    toast.success("Roles updated");
    updated = false;
  }

  onMount(async () => {
    await getData();
  });
</script>

<div class="flex gap-2 mb-4 items-center">
  <Autocomplete items={roleItems} bind:value={selectedRole} />
  <Button onclick={async () => getData(true)} size="icon" class="relative size-8 p-0"
    ><RotateCw /></Button
  >
  <Button
    variant="ghost"
    size="icon"
    class="relative size-8 p-0"
    onclick={async () => handleAdd()}
    disabled={!selectedRole}
  >
    <CirclePlus class="text-success" />
  </Button>
</div>
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

<Button onclick={save} class="mt-5" disabled={!updated}>Save</Button>

<style>
  .deleted {
    text-decoration: line-through;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }
</style>
