<script lang="ts">
  import "./app.css";
  import router from "./router";

  let Thing = $state(router.getComponent(window.data.path));
</script>

<main>
  <div class="flex items-end space-x-2 pl-2">
    <h2 class="text-2xl font-bold tracking-tight">{window.data.label}</h2>
    <p class="text-muted-foreground">{window.data.tenantLabel}</p>
  </div>
  <Thing />
</main>

<style>
</style>
