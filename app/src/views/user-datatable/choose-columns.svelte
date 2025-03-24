<script lang="ts" generics="TData">
  import { Check, Columns3 } from "lucide-svelte";
  import type { Table } from "@tanstack/table-core";
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import { cn } from "$lib/utils";

  let { table }: { table: Table<TData> } = $props();

  let open = $state(false);
  let triggerRef = $state<HTMLButtonElement>(null!);
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="ml-1 hidden h-8 lg:flex"
        size="sm"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        <Columns3 />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Toggle columns..." />
      <Command.List>
        <Command.Empty>No column found.</Command.Empty>
        <Command.Group>
          {#each table
            .getAllColumns()
            .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide()) as column}
            <Command.Item
              value={column.id}
              onSelect={() => {
                column.toggleVisibility();
              }}
            >
              <Check
                class={cn(
                  "mr-2 size-4",
                  !column.getIsVisible() && "text-transparent"
                )}
              />
              {#if typeof column.columnDef.header === "string"}
                {column.columnDef.header}
              {:else}
                {column.id}
              {/if}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
