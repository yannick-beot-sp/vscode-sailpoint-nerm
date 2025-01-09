<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import { ClientFactory } from "../../../services/ClientFactory";
  import type {  User } from "src/model/User";

  let client = ClientFactory.getClient();
  let users : User[]= $state<User[]>([])
  onMount(async()=> {
    users  = await client.getUsers()
    console.log("data loaded");
  })

</script>

  <DataTable bind:data={users} {columns} />

  <div>
    Count: {users.length}
  </div>
