<script lang="ts">
  import DataTable from "../user-datatable/data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { Role } from "src/model/Role";
  import { ClientFactory } from "../../services/ClientFactory";
  import Spinner from "$lib/components/Spinner.svelte";

  let client = ClientFactory.getClient();
  let roles: Role[] = $state<Role[]>([]);
  let loading = $state(true);

  async function getData(forceRefresh?: boolean) {
    loading = true;
    let tmproles: Role[] | undefined;

    if (!forceRefresh) {
      tmproles = client.getData<Role>();
    }

    if (!tmproles) {
      console.log("loading data", forceRefresh);
      tmproles = await client.getRoles(forceRefresh);
      client.setData(tmproles);
    }
    roles = tmproles;
    loading = false;
    console.log("data loaded");
  }

  onMount(async () => {
    await getData();
  });
</script>

{#if loading}
  <div class="flex justify-center gap-3">
    <Spinner show={true} />
  </div>
{:else}
  <DataTable
    bind:data={roles}
    {columns}
    {client}
    refresh={getData}
    tableId="role"
  />
{/if}
