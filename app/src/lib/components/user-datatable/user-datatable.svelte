<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { Users } from "../../../services/Client";
  import { ClientFactory } from "../../../services/ClientFactory";

  let client = ClientFactory.getClient();
  let promiseUser: Promise<Users> = client.getUsers()

</script>

{#await promiseUser then data}
  <DataTable data={data.users} {columns} />
{/await}
