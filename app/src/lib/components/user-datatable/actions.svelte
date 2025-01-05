<script lang="ts">
  import { Pen } from "lucide-svelte";
  import { Trash2 } from "lucide-svelte";
  import { buttonVariants, Button } from "$lib/components/ui/button/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import type { Row, Table } from "@tanstack/table-core";
  import type { User } from "src/model/User";

  let { row, table }: { row: Row<User>, table: Table<User> } = $props();
    const meta = table.options.meta;


  async function handleClick() {
      await meta?.removeRow(row.index)
  }
</script>

<div>
  <Button variant="ghost" size="icon" class="relative size-8 p-0">
    <Pen />
  </Button>
  <Button variant="ghost" size="icon" class="relative size-8 p-0"
  onclick={handleClick}>
    <Trash2 class="text-destructive" />
  </Button>
</div>
