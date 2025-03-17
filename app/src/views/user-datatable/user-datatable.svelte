<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { User } from "src/model/User";
  import { ClientFactory } from "../../services/ClientFactory";
  import Spinner from "$lib/components/Spinner.svelte";

  let client = ClientFactory.getClient();
  let users: User[] = $state<User[]>([]);
  let loading = $state(true);

  async function getData(forceRefresh?: boolean) {
    loading = true;
    let tmpusers: User[] | undefined;
    if (!forceRefresh) {
      tmpusers = client.getData<User>();
    }

    if (!tmpusers) {
      console.log("loading data", forceRefresh);
      tmpusers = await client.getUsers(forceRefresh);
      client.setData(tmpusers);
    }
    users = tmpusers;
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
    bind:data={users}
    {columns}
    {client}
    refresh={getData}
    tableId="user"
  />
{/if}
