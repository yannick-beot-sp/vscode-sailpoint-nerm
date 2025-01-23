<script lang="ts">
  import DataTable from "../user-datatable/data-table.svelte";
  import { columns } from "./columns.js";
  import { onMount } from "svelte";
  import type { Role } from "src/model/Role";
  import { ClientFactory } from "../../services/ClientFactory";

  let client = ClientFactory.getClient();
  let roles: Role[] = $state<Role[]>([]);
  onMount(async () => {
    let tmproles = client.getData<Role>();
    if (!tmproles) {
      tmproles = await client.getRoles();
      client.setData(tmproles);
    }
    roles = tmproles;
    console.log("data loaded");
  });
</script>

<DataTable bind:data={roles} {columns} {client} tableId="role"/>
