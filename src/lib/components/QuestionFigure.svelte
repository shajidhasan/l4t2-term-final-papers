<script lang="ts">
	import FigureDialog from './FigureDialog.svelte';

	const { svg, src, questionId }: { svg?: string; src?: string; questionId: string } = $props();

	const parts = questionId.split('-');
	const caption = `Figure ${parts[2]} (${parts[3]})`;

	let dialogOpen = $state(false);
</script>

<figure
	class="relative mt-3 mb-1 overflow-hidden rounded-lg border border-white/10 bg-white/3 px-4 py-4"
	aria-label={caption}
>
	<button
		onclick={(e) => {
			e.stopPropagation();
			dialogOpen = true;
		}}
		class="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-black/40 p-1.5 text-white/60 transition hover:bg-black/60 hover:text-white"
		aria-label="Expand figure"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="10"
			height="10"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="15 3 21 3 21 9"></polyline>
			<polyline points="9 21 3 21 3 15"></polyline>
			<line x1="21" y1="3" x2="14" y2="10"></line>
			<line x1="3" y1="21" x2="10" y2="14"></line>
		</svg>
	</button>

	<div class="question-figure text-text-primary mx-auto max-w-md">
		{#if svg}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html svg}
		{:else if src}
			<img {src} alt={caption} class="figure-img block h-auto w-full" />
		{/if}
	</div>

	<figcaption
		class="text-text-muted mt-2.5 text-center text-[0.6875rem] font-medium tracking-widest uppercase"
	>
		{caption}
	</figcaption>
</figure>

<FigureDialog {svg} {src} {caption} bind:open={dialogOpen} />

<style>
	.question-figure :global(svg) {
		display: block;
		width: 100%;
		height: auto;
		max-height: 22rem;
	}

	.figure-img {
		filter: invert(1);
		mix-blend-mode: screen;
	}
</style>
