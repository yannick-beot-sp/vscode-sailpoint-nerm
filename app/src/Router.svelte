<script lang="ts">
  import type { Component } from "svelte";
  import type { RouterConfig } from "./model/Router";

  interface Props {
    config: RouterConfig;
    path: string;
  }

  let { config, path }: Props = $props();

  let Thing = $state<Component>(),
    componentProps = $state<{ [key: string]: string } | undefined>({}),
    found = $state<RegExpMatchArray | undefined | null>();
  for (const [routeName, route] of Object.entries(config.routes)) {
    found = path.match(new RegExp(route.path));
    console.log(path, found);

    if (found) {
      Thing = route.component;
      componentProps = found.groups;
      break;
    }
  }
</script>

{#if found !== undefined}
  <div>
    <Thing {...componentProps} />
  </div>
{/if}
