<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import type { WithElementRef } from "bits-ui";
  import type { AttributeOption } from "src/model/Attribute";
  import type { HTMLSelectAttributes } from "svelte/elements";
  interface Props extends WithElementRef<HTMLSelectAttributes> {
    value: string | string[] | undefined;
    options: AttributeOption[];
    name: string;
    label: string;
    type: "single" | "multiple";
    onchange: (e: Event) => void;
  }

  let {
    options,
    value = $bindable(),
    name,
    label,
    type,
    onchange,
    ...restProps
  }: Props = $props();
  const placeholder = "Select a value";
  // NERM API returns the "label" and not the id
  // need to find the id based on the label

  const triggerContent = $derived.by(() => {
    if (value !== undefined && Array.isArray(value)) {
      value
        //.map((x) => options.find((f) => f.id === x || f.option === x)?.option)
        .filter(Boolean)
        .join(", ") ?? placeholder;
    }
    return value ?? placeholder;
    /*
    return (
      options.find((f) => f.id === value || f.option === value)?.option ??
      placeholder
    );*/
  });
  let buttonRef = $state<HTMLButtonElement | null>(null);
</script>

<Select.Root
  {type}
  {name}
  bind:value
  onValueChange={(v) => {
    let e = new Event("change");
    if (buttonRef) {
      buttonRef.value = v;
    }
    Object.defineProperty(e, "target", {
      writable: false,
      value: buttonRef,
    });
    onchange(e);
  }}
>
  <Select.Trigger
    class="w-[180px]"
    {value}
    bind:ref={buttonRef}
    data-accessor={restProps["data-accessor"]}
  >
    {triggerContent}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.GroupHeading>{label}</Select.GroupHeading>
      {#each options as o}
        <Select.Item value={o.option} label={o.option}
          >{o.option}</Select.Item
        >
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>

<style>
</style>
