<script lang="ts" generics="TData, TValue">
  import {
    type PaginationState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
  } from "@tanstack/table-core";
  import {
    createSvelteTable,
    FlexRender,
  } from "$lib/components/ui/data-table/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import DataTablePagination from "$lib/components/ui/data-table/data-table-pagination.svelte";
  import ChooseColumns from "./choose-columns.svelte";
  import { createVisibilityMap } from "./utils";
  import type { MyColumnDef } from "./columns";
  import type { Client } from "src/services/Client";
  type Props = {
    columns: MyColumnDef<TData>[];
    data: TData[];
    client: Client;
  };

  let { data = $bindable(), columns, client }: Props = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnVisibility = $state<VisibilityState>(createVisibilityMap(columns));
  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnVisibility() {
        return columnVisibility;
      },
    },
    meta: {
      client,
      removeRow: async (rowIndex: number) => {
        console.log(">table.meta.removeRow");
        // Note: Svelte react on array assignment
        // So here, I clone the data, remove the row and pass the result to the variable data to "update" data
        const copyData = [...data];
        copyData.splice(rowIndex, 1);
        data = copyData;
        // XXX TODO actually remove from client
      },
      updateRow: async (rowIndex: number, updatedRow: TData) => {
        console.log(">table.meta.updateRow");
        const copyData = [...data];
        copyData[rowIndex] = updatedRow;
        data = copyData;
      },
    },
  });
</script>

<div>
  <div class="flex items-center py-4">
    <ChooseColumns {table} />
  </div>

  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head>
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && "selected"}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell>
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
    <DataTablePagination {table} />
  </div>
</div>
