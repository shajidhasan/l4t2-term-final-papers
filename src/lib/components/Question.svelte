<script lang="ts">
	import Solution from '$lib/components/Solution.svelte';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import Disclosure from './ui/Disclosure.svelte';
	import RenderMarkdown from './RenderMarkdown.svelte';

	const { question }: { question: Question } = $props();
	let mark = $derived(marked.current[question.id]);
	let badgeClass = $derived(
		mark === 'G'
			? 'bg-emerald-400/15 border-emerald-400/30 text-mark-green'
			: mark === 'Y'
				? 'bg-amber-400/15 border-amber-400/30 text-mark-yellow'
				: 'text-text-muted border-white/9 bg-white/4'
	);
</script>

<Disclosure>
	{#snippet summary()}
		<!--
			The row: [(a) badge]  [question text]
			Both are flex-start aligned so (a) sits at top of text block.
			The badge has a slight margin-top to optically align with text baseline.
		-->
		<div class="flex items-start gap-3">
			<span
				class={`mt-[0.2em] inline-flex min-w-7.5 shrink-0 items-center justify-center rounded border px-1.5 py-[0.1rem] text-[0.6875rem] font-medium transition-colors duration-200 ${badgeClass}`}
			>
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
	/* Collapse top margin off first child inside prose so it starts flush */
	.q-text :global(p:first-child),
	.q-text :global(ul:first-child),
	.q-text :global(ol:first-child) {
		margin-top: 0;
	}
</style>
