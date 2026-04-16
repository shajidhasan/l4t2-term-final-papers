<script lang="ts">
	import Solution from '$lib/components/Solution.svelte';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import Disclosure from './ui/Disclosure.svelte';
	import RenderMarkdown from './RenderMarkdown.svelte';

	const { question, showSetNumber }: { question: Question; showSetNumber?: boolean } = $props();
	let mark = $derived(marked.current[question.id]);
	let badgeClass = $derived.by(() =>
		mark === 'G'
			? 'bg-emerald-400/18 border-emerald-400/35 text-mark-green'
			: mark === 'Y'
				? 'bg-amber-400/18 border-amber-400/35 text-mark-yellow'
				: 'text-text-muted border-white/10 bg-white/5'
	);
</script>

<Disclosure>
	{#snippet summary()}
		<div class="flex w-full items-start gap-3">
			<span
				class={`mt-[0.2em] inline-flex min-w-8 shrink-0 items-center justify-center rounded-[5px] border px-1.5 py-0.5 text-[0.6875rem] font-medium whitespace-nowrap transition-colors duration-200 ${badgeClass}`}
			>
				{#if showSetNumber}{question.id.split('-')[2]}{/if}
				({question.id.split('-')[3]})
			</span>
			<div class="q-text solution-prose min-w-0 flex-1 text-sm leading-relaxed">
				<RenderMarkdown markdown={question.text} figureFilter />
			</div>
		</div>
	{/snippet}
	{#snippet body()}
		<Solution {question} />
	{/snippet}
</Disclosure>

<style>
	.q-text :global(p:first-child),
	.q-text :global(ul:first-child),
	.q-text :global(ol:first-child) {
		margin-top: 0;
	}
</style>
