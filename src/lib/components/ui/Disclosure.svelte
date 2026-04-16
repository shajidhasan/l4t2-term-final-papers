<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		summary,
		body,
		initialOpen = false,
		summaryClass = '',
		bodyClass = ''
	}: {
		summary: Snippet;
		body: Snippet;
		initialOpen?: boolean;
		summaryClass?: string;
		bodyClass?: string;
	} = $props();

	let isOpen = $state(false);
	let seeded = $state(false);

	$effect(() => {
		if (!seeded) {
			isOpen = initialOpen;
			seeded = true;
		}
	});
</script>

<div class="border-border-subtle bg-surface border-b last:border-b-0">
	<button
		type="button"
		class={`flex w-full cursor-pointer items-start gap-3 bg-transparent px-4 py-3 text-left transition-colors duration-120 hover:bg-white/2 ${summaryClass}`}
		aria-expanded={isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		<!-- Summary content fills all space -->
		<div class="min-w-0 flex-1">
			{@render summary()}
		</div>
		<!-- Toggle icon aligned to the right -->
		<span
			class={`text-text-muted mt-[0.175rem] hidden size-5.5 shrink-0 items-center justify-center rounded border border-white/9 bg-white/6 transition-all duration-120 sm:inline-flex ${
				isOpen ? 'text-text-secondary bg-white/10' : ''
			}`}
		>
			{#if isOpen}
				<Minus size={11} />
			{:else}
				<Plus size={11} />
			{/if}
		</span>
	</button>

	{#if isOpen}
		<div
			transition:slide={{ duration: 180 }}
			class={`border-border-subtle border-t px-4 py-3 ${bodyClass}`}
		>
			{@render body()}
		</div>
	{/if}
</div>
