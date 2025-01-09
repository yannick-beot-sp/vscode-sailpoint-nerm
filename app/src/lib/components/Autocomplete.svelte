<script lang="ts">
  import { Combobox, type WithoutChildrenOrChild, mergeProps } from "bits-ui";
  import type { Item } from "./Item";
  import { Search, Check, ChevronDown, ChevronUp } from "lucide-svelte";
  import { fly } from "svelte/transition";

  type Props = Combobox.RootProps & {
    items: Item[];
    placeholder?: string;
    emptyMessage?: string;
    inputProps?: WithoutChildrenOrChild<Combobox.InputProps>;
    contentProps?: WithoutChildrenOrChild<Combobox.ContentProps>;
  };

  let {
    items,
    placeholder = "Search...",
    emptyMessage = "No results found",
    value = $bindable(),
    open = $bindable(false),
    inputProps,
    contentProps,
    ...restProps
  }: Props = $props();

  let searchValue = $state("");

  const filteredItems = $derived(
    searchValue === ""
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(searchValue.toLowerCase())
        )
  );

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value;
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = "";
  }

  const mergedRootProps = $derived(
    mergeProps(restProps, { onOpenChange: handleOpenChange })
  );
  const mergedInputProps = $derived(
    mergeProps(inputProps, { oninput: handleInput })
  );
</script>

<Combobox.Root
  bind:value
  bind:open
  {...mergedRootProps}
>
  <div class="relative border-input">
    <!--OrangeSlice
      class="absolute start-3 top-1/2 size-6 -translate-y-1/2 text-muted-foreground"
	  <Search class="mr-2 size-4 shrink-0 opacity-50" />
    /-->
    <Search class="absolute start-3 top-1/2 size-6 -translate-y-1/2 text-muted-foreground"/>
    <Combobox.Input
      {...mergedInputProps}
      class="inline-flex h-input w-[296px] truncate rounded-9px border border-border-input bg-background px-11 text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
      {placeholder}
      aria-label={placeholder}
    />
	<Combobox.Trigger class="absolute end-3 top-1/2 size-6 -translate-y-1/2">open
	 	 </Combobox.Trigger>
  </div>
  <Combobox.Portal>
	<Combobox.Content
	class="max-h-96 w-[296px] min-w-[296px] rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
	sideOffset={10}
  >
		  <Combobox.ScrollUpButton
			class="flex w-full items-center justify-center"
		  >
			<ChevronUp class="size-3" />
		  </Combobox.ScrollUpButton>
		  <Combobox.Viewport class="p-1">
			
			{#each filteredItems as fruit, i (i + fruit.value)}
			  <Combobox.Item
				class="flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none  data-[highlighted]:bg-muted"
				value={fruit.value}
				label={fruit.label}
			  >
				{#snippet children({ selected })}
				  {fruit.label}
				  {#if selected}
					<div class="ml-auto">
					  <Check />
					</div>
				  {/if}
				{/snippet}
			  </Combobox.Item>
			{:else}
			  <span class="block px-5 py-2 text-sm text-muted-foreground">
				No results found, try again.
			  </span>
			{/each}
		  </Combobox.Viewport>

		  <Combobox.ScrollDownButton
			class="flex w-full items-center justify-center"
		  >
			<ChevronDown class="size-3" />
		  </Combobox.ScrollDownButton>
		
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>

	