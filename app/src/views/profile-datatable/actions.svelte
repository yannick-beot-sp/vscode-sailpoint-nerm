<script lang="ts">
  import type { Row, Table } from "@tanstack/table-core";
  import type { Client } from "src/services/Client";
  import DeleteButton from "./action-delete.svelte";
  import ActionEdit from "./action-edit.svelte";
  import type { Profile } from "src/model/Profile";
  import type { Attribute } from "src/model/Attribute";
  let { row, table }: { row: Row<Profile>; table: Table<Profile> } = $props();
  const meta = table.options.meta!;
  const client = meta.client as Client;
  const attributes = meta.attributes as Attribute[];

  async function handleDelete() {
    client.deleteProfile(row.original.id);
    //@ts-ignore
    await meta?.removeRow(row.index);
  }
  async function updateRow(u: Profile) {
    //@ts-ignore
    await meta?.updateRow(row.index, u);
  }
</script>

<div>
  <ActionEdit
    profile={row.original}
    {client}
    {updateRow}
    {attributes}
    edit={false}
  />
  <ActionEdit
    profile={row.original}
    {client}
    {updateRow}
    {attributes}
    edit={true}
  />
  <DeleteButton handleClick={handleDelete} name={row.original.name!} />
</div>
