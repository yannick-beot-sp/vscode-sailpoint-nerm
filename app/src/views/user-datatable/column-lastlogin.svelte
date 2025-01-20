<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { formatTimeAgo } from "$lib/dateUtils";

  interface Props {
    value: string | Date | undefined;
  }

  let { value }: Props = $props();
</script>
{#if value}
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>{formatTimeAgo(new Date(value))}</Tooltip.Trigger>
      <Tooltip.Content>
        <p>{value}</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
{/if}

<style>
</style>
