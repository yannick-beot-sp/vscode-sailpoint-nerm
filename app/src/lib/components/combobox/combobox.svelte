<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import type { Item } from "../Item";

  interface Props {
    items: Item[];
    placeholder?: string;
    emptyString?: string;
    value?:string
  }

  let {
    items,
    placeholder = "Search...",
    emptyString = "No result found.",
    value=$bindable()
  }: Props = $props();

  let open = $state(false);
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(items.find((f) => f.value === value)?.label);

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-full justify-between bg-input-background"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || placeholder}
        <ChevronsUpDown class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-full p-0">
    <Command.Root>
      <Command.Input {placeholder} />
      <Command.List>
        <Command.Empty>{emptyString}</Command.Empty>
        <Command.Group>
          {#each items as item}
            <Command.Item
              value={item.value}
              keywords={item.label.split(" ")}
              onSelect={() => {
                value = item.value;
                closeAndFocusTrigger();
              }}
            >
              <Check
                class={cn(value !== item.value && "text-transparent")}
              />
              {item.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
