<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { SearchResult } from 'minisearch';

	import Solution from '$lib/components/Solution.svelte';
	import { MARK_META } from '$lib/marks';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import Disclosure from '$lib/components/ui/Disclosure.svelte';
	import QuestionFigure from './QuestionFigure.svelte';
	import RenderMarkdown from './RenderMarkdown.svelte';
	import { getGradientForString } from '$lib/utilities';

	const { question }: { question: Question & SearchResult } = $props();

	let highlighted = $derived(
		question.text.replace(
			new RegExp(`(${question.terms.join('|')})`, 'gi'),
			'<span class="search-highlight">$1</span>'
		)
	);

	let mark = $derived(marked.current[question.id]);
	const batch = $derived(question.id.split('-')[1]);
	const number = $derived(question.id.split('-')[2]);
	const letter = $derived(question.id.split('-')[3]);
	let badgeClass = $derived(mark ? MARK_META[mark].badgeStrongClass : '');
</script>

<div transition:fade={{ duration: 300 }}>
	<Disclosure>
		{#snippet summary()}
			<div class="flex w-full items-center gap-3">
				<span
					class={`text-text-muted inline-flex min-w-11 shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6875rem] font-medium ${badgeClass}`}
				>
					{number} ({letter})
				</span>
				<div class="min-w-0 flex-1">
					<div class="solution-prose text-sm leading-relaxed">
						<RenderMarkdown markdown={highlighted} figureFilter />
						{#if question.svg}
							<QuestionFigure svg={question.svg} />
						{/if}
					</div>
					<div class="mt-2.5">
						<span class={`ui-pill ${getGradientForString(batch)}`}>'{batch} Batch</span>
					</div>
				</div>
			</div>
		{/snippet}
		{#snippet body()}
			<Solution {question} />
		{/snippet}
	</Disclosure>
</div>
