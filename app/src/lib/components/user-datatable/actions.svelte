<script lang="ts">
  import type { Row, Table } from "@tanstack/table-core";
  import type { User } from "src/model/User";
  import ActionEdit from "./action-edit.svelte";
  import DeleteButton from "../DeleteButton.svelte";

  let { row, table }: { row: Row<User>; table: Table<User> } = $props();
  const meta = table.options.meta;
  const client = meta.client;

  async function handleClick() {
    //@ts-ignore
    await meta?.removeRow(row.index);
  }
</script>

<div>
  <ActionEdit user={row.original} {client}/>
  <DeleteButton {handleClick} />
</div>
