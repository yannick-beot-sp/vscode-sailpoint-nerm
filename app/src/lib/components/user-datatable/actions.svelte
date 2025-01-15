<script lang="ts">
  import type { Row, Table } from "@tanstack/table-core";
  import type { User } from "src/model/User";
  import ActionEdit from "./action-edit.svelte";
  import DeleteButton from "../DeleteButton.svelte";

  let { row, table }: { row: Row<User>; table: Table<User> } = $props();
  const meta = table.options.meta;
  const client = meta.client;

  async function handleDelete() {
    //@ts-ignore
    await meta?.removeRow(row.index);
  }
  async function updateRow(u: User) {
    //@ts-ignore
    await meta?.updateRow(row.index, u);
  }
</script>

<div>
  <ActionEdit user={row.original} {client} updateRow={updateRow}/>
  <DeleteButton handleClick={handleDelete} />
</div>
