<script lang="ts" generics="TData, TValue">
  import {
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
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
  import { createVisibilityMap } from "$lib/dataTableUtils";
  import type { MyColumnDef } from "./columns";
  import type { Client } from "src/services/Client";
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input";
  import { RotateCw, X } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import type { FacetedFilter } from "src/model/FacetedFilter";
  import DataTableFacetedFilter from "$lib/components/data-table-faceted-filter.svelte";
  type Props = {
    columns: MyColumnDef<TData>[];
    data: TData[];
    client: Client;
    tableId: string;
    refresh: (forceRefresh?: boolean) => Promise<void>;
    meta?: any;
    filters?: FacetedFilter[];
  };

  let {
    data = $bindable(),
    columns,
    client,
    tableId,
    refresh,
    meta,
    filters,
  }: Props = $props();
  let pagination = $state<PaginationState>(
    client.getPaginationState() ?? { pageIndex: 0, pageSize: 10 }
  );
  let sorting = $state<SortingState>(client.getSortingState() ?? []);
  let columnVisibility = $state<VisibilityState>(createVisibilityMap(columns));
  let columnFilters = $state<ColumnFiltersState>([]);
  let globalFilter = $state(client.getGlobalFilter());
  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    globalFilterFn: "includesString", // built-in filter function
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
      client.setSortingState(sorting);
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
      client.setPaginationState(pagination);
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
      client.setColumnFiltersState(tableId, $state.snapshot(columnFilters));
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
      client.setTableVisibilityState(tableId, columnVisibility);
    },
    onGlobalFilterChange: (updater) => {
      console.log(">onGlobalFilterChange");

      if (typeof updater === "function") {
        globalFilter = updater(globalFilter);
      } else {
        globalFilter = updater;
      }
      client.setGlobalFilter($state.snapshot(globalFilter) as string);
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
      get globalFilter() {
        return globalFilter;
      },
      get columnFilters() {
        return columnFilters;
      },
    },
    meta: {
      ...meta,
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

  onMount(async () => {
    const visibilityState = await client.getTableVisibilityState(tableId);
    if (visibilityState) {
      columnVisibility = visibilityState;
    }
    const columnFiltersState = await client.getColumnFiltersState(tableId);
    if (columnFiltersState) {
      columnFilters = columnFiltersState;
    }
  });

  const isFiltered = $derived(table.getState().columnFilters.length > 0);
</script>

<div>
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter..."
      value={globalFilter}
      onChange={(e) => table.setGlobalFilter(String(e.target.value))}
      oninput={(e) => table.setGlobalFilter(String(e.target.value))}
      class="max-w-sm"
    />
    {#if filters}
      {#each filters as filter}
        <DataTableFacetedFilter
          column={table.getColumn(filter.columnName)!}
          title={filter.title}
          options={filter.options}
        />
      {/each}
    {/if}
    {#if isFiltered}
      <Button
        variant="ghost"
        onclick={() => table.resetColumnFilters()}
        class="h-8 px-2 lg:px-3"
      >
        Reset
        <X />
      </Button>
    {/if}
    <Button
      onclick={async () => {
        await refresh(true);
      }}
      size="sm"
      class="ml-auto hidden h-8 lg:flex"
      variant="outline"><RotateCw /></Button
    >
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
