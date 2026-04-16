<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Highlighter from '@lucide/svelte/icons/highlighter';

	import { marked } from '$lib/states';
	import { toaster } from '$lib/toaster';
	import type { Question } from '$lib/types';

	import RenderMarkdown from '$lib/components/RenderMarkdown.svelte';

	const { question }: { question: Question } = $props();
	let currentMark = $derived(marked.current[question.id]);
	let highlightButtonClass = $derived.by(() => {
		if (currentMark === 'G') {
			return 'bg-emerald-400/12 text-mark-green border-emerald-400/30 hover:bg-emerald-400/20';
		} else if (currentMark === 'Y') {
			return 'bg-amber-400/10 text-mark-yellow border-amber-400/25 hover:bg-amber-400/18';
		} else {
			return 'bg-white/5 text-text-secondary border-white/12 hover:bg-white/10 hover:text-text-primary';
		}
	});

	const onHighlight = () => {
		if (marked.current[question.id] === 'G') {
			marked.current[question.id] = undefined;
		} else if (marked.current[question.id] === 'Y') {
			marked.current[question.id] = 'G';
		} else {
			marked.current[question.id] = 'Y';
		}
	};

	const onCopy = async () => {
		await navigator.clipboard.writeText(question.text);
		toaster.success({ title: 'Question copied!' });
	};
</script>

<div class="flex flex-wrap items-center justify-between gap-3 px-0 pt-2.5 pb-3">
	<span
		class="text-text-secondary inline-flex items-center rounded-md border border-white/12 bg-white/8 px-2.5 py-1 text-xs font-medium tracking-widest uppercase"
	>
		{question.marks} marks
	</span>
	<div class="flex flex-wrap gap-1.5">
		<button
			onclick={onCopy}
			class="ui-button ui-button-secondary rounded-md px-2.5 py-1.25 text-xs"
		>
			<Copy size={13} />
			<span class="hidden sm:inline">Copy</span>
		</button>
		<button
			class={`ui-button rounded-md border px-2.5 py-1.25 text-xs transition-colors duration-150 ${highlightButtonClass}`}
			onclick={onHighlight}
		>
			<Highlighter size={13} />
			<span class="hidden sm:inline">
				{#if currentMark === undefined}
					Mark Yellow
				{:else if currentMark === 'Y'}
					Mark Green
				{:else}
					Unmark
				{/if}
			</span>
		</button>
	</div>
</div>

<div class="rounded-lg border border-emerald-400/12 bg-emerald-400/5 px-4">
	<div class="solution-prose">
		<RenderMarkdown markdown={question.solution} />
	</div>
</div>
