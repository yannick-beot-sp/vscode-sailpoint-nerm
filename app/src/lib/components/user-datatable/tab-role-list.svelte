<script lang="ts">
  import type { Role } from "src/model/Role";
  import type { User } from "src/model/User";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import { CirclePlus } from "lucide-svelte";
  import { Button } from "../ui/button";
  import type { UserRolePair } from "src/model/UserRolePair";
  import Autocomplete from "$lib/components/combobox/combobox.svelte";
  import type { Item } from "$lib/components/Item";
  import type { Client } from "src/services/Client";

  interface listItem<T> {
    original: T;
    index: number;
    status?: "Deleted" | "Added";
  }

  type UserRolePairWithRoleName = UserRolePair & {
    name: string;
  };

  interface Props {
    user: User;
    client: Client;
  }

  let { user, client }: Props = $props();

  let userRoles: UserRolePair[] = [
    {
      id: "5d21b470-dfdf-4eb9-a011-6addd88c4129",
      uid: "253949d4d5a14eb4ad5340ec56536e0a",
      user_id: "f9b5f3d2-2c2c-4a2c-b968-00044bb9bdbb",
      role_id: "322b4dbb-9956-48cc-b6b1-86bcc43d4fd4",
    },
    {
      id: "5d21b470-dfdf-4eb9-a011-6addd88c4129",
      uid: "253949d4d5a14eb4ad5340ec56536e0a",
      user_id: "f9b5f3d2-2c2c-4a2c-b968-00044bb9bdbb",
      role_id: "3205bdb2-cde1-4f24-98c2-02c00111b7ca",
    },
  ];

  let roles: Role[] = [
    {
      id: "7dceabc1-1788-467e-b4e0-48ae5c8a5662",
      uid: "b3_department_admins_neprofile_role",
      name: "Department Admins",
      groups: ["Department Admins"],
    },
    {
      id: "872f424a-0095-4025-990f-deae3fdd1c12",
      uid: "b3_all_suborganization_collaborators_neaccess_role",
      name: "All Sub-Organization Collaborators",
      groups: ["All Sub-Organization Collaborators"],
    },
    {
      id: "322b4dbb-9956-48cc-b6b1-86bcc43d4fd4",
      uid: "b3_department_approvers_neprofile_role",
      name: "Department Approvers",
      groups: ["Department Approvers"],
    },
    {
      id: "3205bdb2-cde1-4f24-98c2-02c00111b7ca",
      uid: "b3_system_configuration_admins_neprofile_role",
      name: "System Configuration Admins",
      groups: ["System Configuration Admins"],
    },
  ];

  const roleMap = new Map<string, Role>();
  roles.forEach((x) => {
    roleMap.set(x.id, x);
  });
  const userRolesMap = new Map<string, UserRolePair>();
  userRoles.forEach((x) => {
    userRolesMap.set(x.role_id, x);
  });

  let index = 0;
  let items: listItem<UserRolePairWithRoleName>[] = $state(
    userRoles
      .map((x) => {
        const role = roleMap.get(x.role_id);
        return {
          original: {
            ...x,
            name: role?.name ?? "N/A",
          },
          index: index++,
        };
      })
      .sort((a, b) => a.original.name.localeCompare(b.original.name))
  );

  let selectedRole = $state<string>();
  let roleItems: Item[] = $state(
    roles
      .filter((x) => !userRolesMap.has(x.id))
      .map((x) => ({ label: x.name, value: x.id }))
  );

  function handleDelete(index: number) {
    console.log(">handleDelete", index, items);
    items[index].status = "Deleted";
  }
  function handleRestore(index: number) {
    console.log(">handleRestore", index, items);
    items[index].status = "Added";
  }

  function handleAdd() {
    console.log(">handleAdd");
    if (selectedRole) {
      const role = roleMap.get(selectedRole);
      const lastIndex = items.reduce(
        (accumulator, currentValue) =>
          Math.max(currentValue.index, accumulator),
        0
      );
      items.push({
        index: lastIndex + 1,
        original: {
          id: "0",
          uid: "0",
          user_id: user.id,
          role_id: selectedRole,
          name: role?.name ?? "",
        },
        status: "Added",
      });
      roleItems = roleItems.filter((x) => x.value !== selectedRole);
      selectedRole = undefined;
    }
  }
  function save() {
    console.log(">save", items);
    items = items.filter((x) => x.status !== "Deleted");
  }
</script>

<div class="flex gap-2 mb-4 items-center">
  <Autocomplete items={roleItems} bind:value={selectedRole} />
  <Button
    variant="ghost"
    size="icon"
    class="relative size-8 p-0"
    onclick={handleAdd}
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
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          {#if item.status !== "Deleted"}
            <DeleteButton handleClick={() => handleDelete(item.index)} />
          {:else}
            <Button
              variant="ghost"
              size="icon"
              class="relative size-8 p-0"
              onclick={() => handleRestore(item.index)}
            >
              <CirclePlus class="text-success" />
            </Button>
          {/if}
        </div>
      </div>
    </li>
  {/each}
</ul>

<Button onclick={save} class="mt-5">Save</Button>

<style>
  .deleted {
    text-decoration: line-through;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }
</style>
