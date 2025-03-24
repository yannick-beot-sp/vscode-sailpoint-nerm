<script lang="ts">
  import "./app.css";
  import { routerConfig } from "./router-config";
  import Router from "./Router.svelte";
  

  
  
</script>

<main>
  <div class="flex items-end space-x-2 pl-2">
    <h2 class="text-2xl font-bold tracking-tight">{window.data.label}</h2>
    <p class="text-muted-foreground">{window.data.tenantLabel}</p>
  </div>
  <Router config={routerConfig} path={window.data.path}></Router>
</main>

<style>
</style>
