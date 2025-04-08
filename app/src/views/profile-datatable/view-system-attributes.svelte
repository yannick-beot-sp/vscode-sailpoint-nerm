<script lang="ts">
  import { Eye, Pen, Copy as CopyIcon } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { copyText } from "$lib/utils";
  import type { Profile } from "src/model/Profile";

  interface Props {
    profile: Profile;
  }

  let { profile }: Props = $props();

  const divWrapperClass = "grid grid-cols-4 items-center gap-4";
  const labelClass = "text-right col-span-2";
  const divValueClass = "col-span-2";
</script>

<!-- ID -->
<div class={divWrapperClass}>
  <Label class={labelClass}>ID</Label>
  <div class={divValueClass}>
    {profile.id}
    <Button
      variant="ghost"
      size="icon"
      class="relative size-8 p-0"
      onclick={async () => copyText(profile.id)}
    >
      <CopyIcon />
    </Button>
  </div>
</div>
<!-- Status -->
<div class={divWrapperClass}>
  <Label class={labelClass}>Status</Label>
  <div class={divValueClass}>
    {profile.status}
  </div>
</div>
<!-- Proofing Status -->
<div class={divWrapperClass}>
  <Label class={labelClass}>Proofing Status</Label>
  <div class={divValueClass}>
    {profile.id_proofing_status}
  </div>
</div>

<style>
</style>
