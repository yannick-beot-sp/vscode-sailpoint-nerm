<script lang="ts">
  import { Pen } from "lucide-svelte";
  import type { User } from "src/model/User";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import UserForm from "./tab-user-form.svelte";
  import TabRoleList from "./tab-role-list.svelte";
  import type { Client } from "src/services/Client";

  interface Props {
    user: User;
    client: Client;
  }

  let { user, client }: Props = $props();
</script>

<Sheet.Root>
  <Sheet.Trigger
    class={buttonVariants({
      variant: "ghost",
      size: "icon",
      class: "relative size-8 p-0",
    })}
  >
    <Pen /></Sheet.Trigger
  >
  <Sheet.Content
    side="right"
    class="sm:max-w-lg overflow-y-scroll max-h-screen"
  >
    <Tabs.Root value="user" class="w-full pt-4">
      <Tabs.List class="grid w-full grid-cols-2 gap-1">
        <Tabs.Trigger value="user">User</Tabs.Trigger>
        <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="user" class="pt-4">
        <UserForm {user} />
      </Tabs.Content>
      <Tabs.Content value="roles" class="pt-4">
        <TabRoleList {user} {client}/>
      </Tabs.Content>
    </Tabs.Root>
  </Sheet.Content>
</Sheet.Root>
