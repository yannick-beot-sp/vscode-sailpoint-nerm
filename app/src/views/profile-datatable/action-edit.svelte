<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Eye, Pen } from "lucide-svelte";
  import type { Profile } from "src/model/Profile";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import type { Client } from "src/services/Client";
  import { Label } from "$lib/components/ui/label";
  import type { Attribute } from "src/model/Attribute";
  import ProfileInput from "./profile-input.svelte";
  import ViewSystemAttributes from "./view-system-attributes.svelte";
  import EditSystemAttributes from "./edit-system-attributes.svelte";

  interface Props {
    profile: Profile;
    client: Client;
    attributes: Attribute[];
    updateRow: (p: Profile) => void;
    mode: "view" | "edit";
  }
  let updated = $state(false);
  let { profile, client, attributes, updateRow, mode }: Props = $props();
  let edit = $state(mode === "edit");
  function getAttributeDisplayName(key: string) {
    return attributes.find((x) => x.uid === key)?.label;
  }

  let updates = new Set<HTMLElement>();

  function onchange(event: Event) {
    // console.log(event);
    // console.log(event.target?.id);
    // console.log(event.target?.dataset?.accessor);
    updates.add(event.target as HTMLElement);
    updated = true;
  }

  async function save() {
    console.log("> save");
    const updatedProfile: Profile = {
      id: profile.id,
      attributes: {},
    };
    for (const item of updates) {
      console.log({ item });

      const accessor = item.dataset?.accessor;
      // @ts-ignore
      const value = item.value;
      console.log({ accessor, value });

      if (!accessor) {
        console.warn("Could not find accessor on ", item);
        continue;
      }
      const index = accessor.indexOf(".");
      if (index > 0) {
        const key = accessor.substring(index + 1);
        updatedProfile.attributes[key] = value;
      } else {
        // @ts-ignore
        updatedProfile[accessor] = value;
      }
    }
    await client.updateProfile(updatedProfile);
    updated = false;
    const mergedAttributes = {
      ...profile.attributes,
      ...updatedProfile.attributes,
    };
    updateRow({ ...profile, ...updatedProfile, attributes: mergedAttributes });
    toast.success("Profile updated");
  }
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
    {#if edit}
      <Pen />
    {:else}
      <Eye />
    {/if}
  </Sheet.Trigger>

  <Sheet.Content
    side="right"
    class="sm:max-w-3xl overflow-y-scroll max-h-screen"
  >
    <Sheet.Title>{profile.name}</Sheet.Title>
    <div class="grid gap-4 py-4">
      {#if edit}
        <EditSystemAttributes {profile} {onchange}></EditSystemAttributes>
      {:else}
        <ViewSystemAttributes {profile}></ViewSystemAttributes>
      {/if}
      {#if profile.attributes}
        {#each Object.keys(profile.attributes).sort( (a, b) => a.localeCompare( b, undefined, { sensitivity: "base" } ) ) as key}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for={key} class="text-right col-span-2"
              >{getAttributeDisplayName(key)} ({key})</Label
            >
            <ProfileInput
              value={profile.attributes[key]}
              name={key}
              {attributes}
              {onchange}
              editable={edit}
            ></ProfileInput>
          </div>
        {/each}
      {/if}
    </div>
    {#if edit}
      <Sheet.Footer>
        <Button type="submit" disabled={!updated} onclick={async () => save()}
          >Save changes</Button
        >
      </Sheet.Footer>
    {/if}
  </Sheet.Content>
</Sheet.Root>
