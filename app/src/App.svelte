<script lang="ts">
  import "./app.css";
  import UserDataTable from "./views/user-datatable/user-datatable.svelte"
  import RoleDataTable from "./views/role-datatable/role-datatable.svelte"
</script>

<main>

  <div class="flex items-end  space-x-2 pl-2">
			<h2 class="text-2xl font-bold tracking-tight">Users</h2>
			<p class="text-muted-foreground">{window.data.tenantLabel}</p>
	</div>
<!--UserDataTable /-->
<RoleDataTable/>
</main>

<style>

</style>
