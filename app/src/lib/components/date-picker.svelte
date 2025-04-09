<script lang="ts">
  import { Calendar as CalendarIcon } from "lucide-svelte";
  import {
    type DateValue,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import type { WithElementRef } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {
    formatDateValue,
    formatHumanReadableDate,
    parseDateString,
  } from "$lib/utils/date";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends WithElementRef<HTMLInputAttributes> {
    value: string;
    dateFormat: string;
    name: string;
    onchange: (e: Event) => void;
  }

  let {
    dateFormat,
    value = $bindable(),
    name,
    onchange,
    ...restProps
  }: Props = $props();

  let valueDate = $derived(parseDateString(value, dateFormat));

  function getValue() {
    return valueDate ?? today(getLocalTimeZone());
  }

  function setValue(newValue: DateValue) {
    if (newValue) {
      value = formatDateValue(newValue, dateFormat);
    }
  }

  function extractDataAttributes<T extends Record<string, any>>(props: T) {
    const dataAttributes: { [key: `data-${string}`]: any } = {};

    for (const key in props) {
      if (key.startsWith("data-")) {
        dataAttributes[key as `data-${string}`] = props[key];
      }
    }

    return dataAttributes;
  }

  const dataset = extractDataAttributes(restProps); // to get data-accessor
  let buttonRef = $state<HTMLButtonElement | null>(null);
  // Manage open state (to force close on date selection)
  // No event is returned by Calendar "onchange". Need to build one
  let isOpen = $state(false);
  function closeOnChange(e: Event) {
    e = new Event("change");
    Object.defineProperty(e, "target", {
      writable: false,
      value: buttonRef,
    });
    onchange(e);
    isOpen = false;
  }
</script>

<Popover.Root bind:open={isOpen}>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        bind:ref={buttonRef}
        {name}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !value && "text-muted-foreground"
        )}
        {...props}
        {...dataset}
        {value}
        {onchange}
      >
        <CalendarIcon class="mr-2 size-4" />
        {valueDate
          ? formatHumanReadableDate(valueDate.toDate(getLocalTimeZone()))
          : "Select a date"}
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar
      type="single"
      initialFocus
      bind:value={getValue, setValue}
      onValueChange={closeOnChange}
      {...restProps}
    ></Calendar>
  </Popover.Content>
</Popover.Root>
