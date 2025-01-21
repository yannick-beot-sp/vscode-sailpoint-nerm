<script lang="ts">
  import { Users, Copy as CopyIcon } from "lucide-svelte";
  import type { Role } from "src/model/Role";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import type { Client } from "src/services/Client";
  import { copyText } from "$lib/utils";
  import ActionEditMemberList from "./action-edit-member-list.svelte"

  interface Props {
    role: Role;
    client: Client;
    updateRow: (u: Role) => void;
  }

  let { role, client, updateRow }: Props = $props();
</script>

<Toaster />
<Sheet.Root>
  <Sheet.Trigger
    class={buttonVariants({
      variant: "ghost",
      size: "icon",
      class: "relative size-8 p-0",
    })}
  >
    <Users /></Sheet.Trigger
  >
  <Sheet.Content
    side="right"
    class="sm:max-w-lg overflow-y-scroll max-h-screen"
  >
    <div class="px-4 sm:px-0 mb-4" >
      <h2 class="text-base/7 font-semibold">{role.name}</h2>
    </div>
    <div class="flex flex-col mb-4">
      <Label class="label">ID</Label>
      <p>
        {role.id}
        <Button
          variant="ghost"
          size="icon"
          class="relative size-8 p-0"
          onclick={async () => copyText(role.id)}
        >
          <CopyIcon />
        </Button>
      </p>
    </div>
    <ActionEditMemberList {role} {client} />
  </Sheet.Content>
</Sheet.Root>
