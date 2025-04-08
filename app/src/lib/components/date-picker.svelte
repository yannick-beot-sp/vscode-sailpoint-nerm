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

  //console.log({value, dateFormat, valueDate});
  

  function getValue() {

    return valueDate ?? today(getLocalTimeZone());
  }

  function setValue(newValue: DateValue) {
    value = formatDateValue(newValue, dateFormat);
  }
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        {name}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !value && "text-muted-foreground"
        )}
        {...props}
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
      onValueChange={onchange}
      {...restProps}
    ></Calendar>
  </Popover.Content>
</Popover.Root>
