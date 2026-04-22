<script lang="ts">
	const { svg }: { svg: string } = $props();
</script>

<figure
	class="mt-3 mb-1 overflow-hidden rounded-lg border border-white/10 bg-white/3 px-4 py-4"
	aria-label="Figure for the question"
>
	<div class="question-figure text-text-primary mx-auto max-w-md">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html svg}
	</div>
	<figcaption
		class="text-text-muted mt-2.5 text-center text-[0.6875rem] font-medium tracking-widest uppercase"
	>
		Figure
	</figcaption>
</figure>

<style>
	.question-figure :global(svg) {
		display: block;
		width: 100%;
		height: auto;
		max-height: 22rem;
	}
</style>
