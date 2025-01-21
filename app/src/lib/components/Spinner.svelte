<script lang="ts">
  import { LoaderCircle } from "lucide-svelte";
  interface Props {
    show: boolean;
  }

  let { show = true }: Props = $props();
</script>

{#if show}
  <LoaderCircle class="animate-spin" />
{/if}
