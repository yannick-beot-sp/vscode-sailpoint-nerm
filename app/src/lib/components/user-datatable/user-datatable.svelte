<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { Users } from "../../../services/Client";
  import { ClientFactory } from "../../../services/ClientFactory";
  import type {  User } from "src/model/User";

  let client = ClientFactory.getClient();
  let users : User[]= $state<User[]>([])
  onMount(async()=> {
    let results  = await client.getUsers()
    users = results.users
    console.log("data loaded");
    
  })

</script>

  <DataTable bind:data={users} {columns} />

  <div>
    Count: {users.length}
  </div>
