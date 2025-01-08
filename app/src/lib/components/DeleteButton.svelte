<script lang="ts">
  import { Trash2 } from "lucide-svelte";
  import { Button } from "./ui/button";
  interface Props {
    handleClick: (
      element: EventTarget,
      type: string,
      handler: EventListener,
      options?: AddEventListenerOptions | undefined
    ) => void;
  }

  let { handleClick }: Props = $props();
</script>

<Button
  variant="ghost"
  size="icon"
  class="relative size-8 p-0"
  onclick={handleClick}
>
  <Trash2 class="text-destructive" />
</Button>
