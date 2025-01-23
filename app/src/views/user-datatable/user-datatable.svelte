<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { User } from "src/model/User";
  import { ClientFactory } from "../../services/ClientFactory";

  let client = ClientFactory.getClient();
  let users: User[] = $state<User[]>([]);
  onMount(async () => {
    let tmpusers = client.getData<User>();
    if (!tmpusers) {
      tmpusers = await client.getUsers();
      client.setData(tmpusers);
    }
    users = tmpusers;
    console.log("data loaded");
  });
</script>

<DataTable bind:data={users} {columns} {client} tableId="user" />
