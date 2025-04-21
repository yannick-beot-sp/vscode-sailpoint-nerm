<script lang="ts">
  import DatePicker from "$lib/components/date-picker.svelte";
  import { Input } from "$lib/components/ui/input";
  import { formatHumanReadableDate, parseDateString } from "$lib/utils/date";

  import type { AttributeWithOptions } from "src/model/Attribute";
  import Select from "./inputs/select.svelte";
  import { SquareArrowOutUpRight } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import type { Client } from "src/services/Client";

  interface Props {
    value: string;
    attributes: AttributeWithOptions[];
    name: string;
    onchange: (e: Event) => void;
    editable: boolean;
    client: Client;
  }

  let { attributes, value, name, onchange, editable, client }: Props = $props();
  let attribute = attributes.find((x) => x.uid === name);
  let attributeType = attribute?.type;

  async function open(v: string) {
    const profileTypeId = attribute?.profile_type_id || "";
    const profiles = await client.getProfiles(profileTypeId);
    const p = profiles.find((x) => x.name == v);
    if (p) {
      const uri = `/profiles/${profileTypeId}/${p.id}`;
      client.open(uri);
    } else {
      console.error("Profile not found", profileTypeId, v);
    }
  }
</script>

{#if editable && attributeType === "TextFieldAttribute"}
  <Input
    id={name}
    {value}
    class="col-span-2"
    oninput={onchange}
    data-accessor={"attributes." + name}
  />
{:else if editable && (attributeType === "RadioButtonsAttribute" || attributeType === "DropDownAttribute" || attributeType === "CheckBoxesAttribute")}
  <Select
    {value}
    {name}
    {onchange}
    options={attribute?.options || []}
    label={attribute?.label as string}
    type={attributeType === "CheckBoxesAttribute" ? "multiple" : "single"}
    data-accessor={"attributes." + name}
  ></Select>
{:else if editable && attributeType === "DateAttribute"}
  <DatePicker
    {value}
    {name}
    {onchange}
    dateFormat={attribute?.date_format as string}
    data-accessor={"attributes." + name}
  ></DatePicker>
{:else if !editable && attributeType === "DateAttribute"}
  <div class="col-span-2">{formatHumanReadableDate(parseDateString(value, attribute?.date_format ?? "mm/dd/yyyy")?.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))}</div>
{:else if !editable && (attributeType === "ProfileSearchAttribute" || attributeType === "ProfileSelectAttribute")}
  {#if value.indexOf(",") === -1}
    <!-- single profile-->
    <Button variant="ghost" class="w-fit" onclick={async () => open(value)}
      >{value} <SquareArrowOutUpRight class="size-4" /></Button
    >
  {:else}
    <!-- multiple profiles-->
    <div class="col-span-2">
      {#each value.split(", ") as item}
        <Button variant="ghost" class="w-fit" onclick={async () => open(item)}
          >{item} <SquareArrowOutUpRight class="size-4" /></Button
        >
      {/each}
    </div>
  {/if}
{:else}
  <div class="col-span-2">{value}</div>
{/if}

<style>
</style>
