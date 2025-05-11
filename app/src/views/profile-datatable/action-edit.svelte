<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Eye, Pen, CirclePlus } from "lucide-svelte";

  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import Autocomplete from "$lib/components/combobox/combobox.svelte";
  import { Label } from "$lib/components/ui/label";

  import type { Client } from "src/services/Client";
  import type { Profile } from "src/model/Profile";
  import type { Attribute } from "src/model/Attribute";

  import ProfileInput from "./profile-input.svelte";
  import ViewSystemAttributes from "./view-system-attributes.svelte";
  import EditSystemAttributes from "./edit-system-attributes.svelte";
  import type { Item } from "$lib/components/Item";
  import { compare } from "$lib/utils/stringUtils";

  interface listItem<T> {
    original: T;
    status?: "Deleted" | "Added";
    new?: boolean;
  }

  interface Props {
    profile: Profile;
    client: Client;
    attributes: Attribute[];
    updateRow: (p: Profile) => void;
    mode: "view" | "edit";
    open?: boolean;
    hidden?: boolean;
  }
  let updated = $state(false);
  let {
    profile,
    client,
    attributes,
    updateRow,
    mode,
    open = false,
    hidden = false,
  }: Props = $props();

  let edit = $state(mode === "edit");
  function getAttributeDisplayName(key: string) {
    return attributes.find((x) => x.uid === key)?.label;
  }

  let updates = new Set<HTMLElement>();

  function onchange(event: Event) {
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

  let isOpen = $state(open);
  let selectedAttribute = $state<string>();

  let attributesMap = $derived.by(() => {
    let attributesMap = new Map<string, boolean>();
    if (profile.attributes) {
      Object.keys(profile.attributes).forEach((x) => {
        attributesMap.set(x, true);
      });
    }
    return attributesMap;
  });

  let newAttributeItems: Item[] = $derived(
    attributes
      .filter((x) => !attributesMap.has(x.uid))
      .map((x) => ({ label: x.label, value: x.uid }))
      .sort((a, b) => compare(a.label, b.label))
  );

  function handleAdd() {
    console.log(">handleAdd");
    if (selectedAttribute) {
      // const newAttr = attributes.find((x) => x.uid === selectedAttribute);
      if (profile.attributes) {
        profile.attributes[selectedAttribute] = "";
      } else {
        profile.attributes = {
          [selectedAttribute]: ""
        };
      }

      selectedAttribute = undefined;
      updated = true;
    }
  }
</script>

<Toaster />

<Sheet.Root bind:open={isOpen}>
  {#if !hidden}
    <Sheet.Trigger
      class={buttonVariants({
        variant: "ghost",
        size: "icon",
        class: "relative size-8 p-0",
      })}
    >
      {#if mode === "edit"}
        <Pen />
      {:else}
        <Eye />
      {/if}
    </Sheet.Trigger>
  {/if}
  <Sheet.Content
    side="right"
    class="sm:max-w-3xl overflow-y-scroll max-h-screen"
  >
    <Sheet.Title
      >{profile.name}
      {#if edit}
        <Button
          variant="ghost"
          size="icon"
          class="relative size-8 p-0"
          onclick={async () => {
            edit = false;
          }}
        >
          <Eye />
        </Button>
      {:else}
        <Button
          variant="ghost"
          size="icon"
          class="relative size-8 p-0"
          onclick={async () => {
            edit = true;
          }}
        >
          <Pen />
        </Button>
      {/if}
    </Sheet.Title>
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
              {client}
              editable={edit}
            ></ProfileInput>
          </div>
        {/each}
      {/if}
      {#if edit}
        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
        >
          <Autocomplete
            items={newAttributeItems}
            bind:value={selectedAttribute}
          />
          <Button
            variant="ghost"
            size="icon"
            class="relative size-8 p-0"
            onclick={async () => handleAdd()}
            disabled={!selectedAttribute}
          >
            <CirclePlus class="text-success" />
          </Button>
        </div>
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
