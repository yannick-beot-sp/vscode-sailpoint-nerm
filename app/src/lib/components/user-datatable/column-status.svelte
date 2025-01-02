<script lang="ts">
  import { Badge, type BadgeVariant } from "$lib/components/ui/badge/index.js";
  
  interface Props {
    status: string;
  }

  let { status }: Props = $props();
  let variant: BadgeVariant = status === "Disabled" ? "destructive" : "success";
</script>

<div>
  <Badge {variant}>{status}</Badge>
</div>

<style>
</style>
