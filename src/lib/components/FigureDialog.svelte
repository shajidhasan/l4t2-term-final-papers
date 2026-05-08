<script lang="ts">
	let {
		svg,
		src,
		caption,
		open = $bindable(false)
	}: { svg?: string; src?: string; caption: string; open: boolean } = $props();

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (!dialog) return;
		if (open) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	});

	function closeOnBackdrop(e: MouseEvent) {
		e.stopPropagation();
		if (e.target === dialog) open = false;
	}
</script>

<dialog
	bind:this={dialog}
	onclick={closeOnBackdrop}
	onclose={() => (open = false)}
	class="m-auto w-full max-w-3xl rounded-xl border border-white/10 bg-card p-0 shadow-2xl"
>
	<div class="flex flex-col gap-4 p-5">
		<div class="flex items-center justify-between">
			<span class="text-text-muted text-[0.6875rem] font-medium tracking-widest uppercase">
				{caption}
			</span>
			<button
				onclick={(e) => {
					e.stopPropagation();
					open = false;
				}}
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-white/40 transition hover:bg-white/8 hover:text-white"
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
		<div class="dialog-figure">
			{#if svg}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html svg}
			{:else if src}
				<img {src} alt={caption} class="figure-img block h-auto w-full" />
			{/if}
		</div>
	</div>
</dialog>

<style>
	.dialog-figure :global(svg) {
		display: block;
		width: 100%;
		height: auto;
	}

	.figure-img {
		filter: invert(1);
		mix-blend-mode: screen;
	}

	:global(dialog::backdrop) {
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(2px);
	}
</style>
