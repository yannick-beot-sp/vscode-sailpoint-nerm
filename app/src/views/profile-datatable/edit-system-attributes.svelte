<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Status, type Profile } from "src/model/Profile";
  import Select from "$lib/components/simple-select/select.svelte";
  interface Props {
    profile: Profile;
    onchange: (e: Event) => void;
  }

  let { profile, onchange }: Props = $props();

  const divWrapperClass = "grid grid-cols-4 items-center gap-4";
  const labelClass = "text-right col-span-2";
  const divValueClass = "col-span-2";
</script>

<!-- Status -->
<div class={divWrapperClass}>
  <Label class={labelClass} for="status">Status</Label>
  <div class={divValueClass}>
    <Select
      name="status"
      required
      id="status"
      items={Status}
      value={profile.status}
      {onchange}
    />
  </div>
</div>

<style>
</style>
