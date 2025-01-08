<script lang="ts">
  import type {
    HTMLOptionAttributes,
    HTMLSelectAttributes,
  } from "svelte/elements";
  import type { WithElementRef } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends WithElementRef<HTMLSelectAttributes> {
    items: string[] | Record<string, string> | HTMLOptionAttributes[];
  }

  function isArrayOfStrings(value: unknown): value is Array<string> {
    return (
      Array.isArray(value) &&
      value.every((element) => typeof element === "string")
    );
  }

  function isStringRecord(value: unknown): value is Record<string, string> {
    return (
      value !== null &&
      typeof value === "object" &&
      Object.values(value).every((val) => typeof val === "string")
    );
  }

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    items,
    ...restProps
  }: Props = $props();

  if (isArrayOfStrings(items)) {
    items = items.map((x) => ({
      label: x,
      value: x,
    }));
  } else if (isStringRecord(items)) {
    const newItems: HTMLOptionAttributes[] = [];
    Object.entries(items).forEach(([key, value]) => {
      newItems.push({
        label: value,
        value: key,
      });
      items = newItems;
    });
  }
</script>

<select
  bind:this={ref}
  class={cn(
    "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    className
  )}
  bind:value
  {...restProps}
>
  {#each items as item}
    <option
      disabled={item.disabled}
      selected={item.selected}
      value={item.value}
    >
      {item.label}
    </option>
  {/each}
</select>
