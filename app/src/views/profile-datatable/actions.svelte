<script lang="ts">
  import type { Row, Table } from "@tanstack/table-core";
  import type { User } from "src/model/User";
  import type { Client } from "src/services/Client";
  import DeleteButton from "./action-delete.svelte";
  let { row, table }: { row: Row<User>; table: Table<User> } = $props();
  const meta = table.options.meta!;
  const client = meta.client as Client;

  async function handleDelete() {
    client.deleteProfile(row.original.id);
    //@ts-ignore
    await meta?.removeRow(row.index);
  }
  async function updateRow(u: User) {
    //@ts-ignore
    await meta?.updateRow(row.index, u);
  }
</script>

<div>
  <DeleteButton handleClick={handleDelete} name={row.original.name} />
</div>
