<script lang="ts">
  import DatePicker from "$lib/components/date-picker.svelte";
  import { Input } from "$lib/components/ui/input";
  import { formatHumanReadableDate } from "$lib/utils/date";

  import type { Attribute, AttributeWithOptions } from "src/model/Attribute";
  import Select from "./inputs/select.svelte";

  interface Props {
    value: string;
    attributes: AttributeWithOptions[];
    name: string;
    onchange: (e: Event) => void;
    editable: boolean;
  }

  let { attributes, value, name, onchange, editable }: Props = $props();
  let attribute = attributes.find((x) => x.uid === name);
  let attributeType = attribute?.type;
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
  <div class="col-span-2">{formatHumanReadableDate(value)}</div>
{:else}
  <div class="col-span-2">{value}</div>
{/if}

<style>
</style>
