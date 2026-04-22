<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';

	import { marked } from '$lib/states';
	import { MARK_ORDER, MARK_META, type MarkColor } from '$lib/marks';
	import { toaster } from '$lib/toaster';
	import type { Question } from '$lib/types';

	import RenderMarkdown from '$lib/components/RenderMarkdown.svelte';

	const { question }: { question: Question } = $props();
	let currentMark = $derived(marked.current[question.id]);

	const setMark = (color: MarkColor) => {
		marked.current[question.id] = marked.current[question.id] === color ? undefined : color;
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
	<div class="flex flex-wrap items-center gap-2">
		<div
			class="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-2 py-1"
			role="radiogroup"
			aria-label="Mark this question"
		>
			{#each MARK_ORDER as color (color)}
				{@const active = currentMark === color}
				<button
					type="button"
					role="radio"
					aria-checked={active}
					aria-label={MARK_META[color].label}
					title={MARK_META[color].label}
					onclick={() => setMark(color)}
					class={`h-4 w-4 rounded-full border border-white/15 transition-transform duration-150 hover:scale-115 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${MARK_META[color].dotClass} ${active ? 'ring-2 ring-white/75 ring-offset-1 ring-offset-[var(--color-card)]' : ''}`}
				></button>
			{/each}
		</div>
		<button
			onclick={onCopy}
			class="ui-button ui-button-secondary rounded-md px-2.5 py-1.25 text-xs"
		>
			<Copy size={13} />
			<span class="hidden sm:inline">Copy</span>
		</button>
	</div>
</div>

<div class="rounded-lg border border-emerald-400/12 bg-emerald-400/5 px-4">
	<div class="solution-prose">
		<RenderMarkdown markdown={question.solution} />
	</div>
</div>
