<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Status, type Profile } from "src/model/Profile";
  import Select from "$lib/components/simple-select/select.svelte";
  import { Input } from "$lib/components/ui/input";
  interface Props {
    profile: Profile;
    onchange: (e: Event) => void;
  }

  let { profile, onchange }: Props = $props();

  const divWrapperClass = "grid grid-cols-4 items-center gap-4";
  const labelClass = "text-right col-span-2";
  const divValueClass = "col-span-2";
</script>

<!-- Name -->
<div class={divWrapperClass}>
  <Label class={labelClass} for="name">Name</Label>
  <div class={divValueClass}>
    <Input
      id="name"
      value={profile.name}
      class="col-span-2"
      oninput={onchange}
      data-accessor="name"
    />
  </div>
</div>
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
      data-accessor="status"
    />
  </div>
</div>

<style>
</style>
