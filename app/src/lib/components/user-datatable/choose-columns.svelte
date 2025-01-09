<script lang="ts" generics="TData">
  import { Columns3 } from "lucide-svelte";
  import type { Table } from "@tanstack/table-core";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  let { table }: { table: Table<TData> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({
      variant: "outline",
      size: "sm",
      class: "ml-auto hidden h-8 lg:flex",
    })}
  >
    <Columns3 />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Toggle columns</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      {#each table
        .getAllColumns()
        .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide()) as column}
        <DropdownMenu.CheckboxItem
          controlledChecked
          checked={column.getIsVisible()}
          onCheckedChange={(v) => column.toggleVisibility(!!v)}
          class="capitalize"
        >
          {#if typeof column.columnDef.header === "string"}
            {column.columnDef.header}
          {:else}
            {column.id}
          {/if}
        </DropdownMenu.CheckboxItem>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
