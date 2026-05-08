<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '@fontsource/atma/400.css';
	import { fetchTestimonials, type Testimonial } from '$lib/testimonials';
import TestimonialModal from '$lib/components/TestimonialModal.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let testimonials = $state<Testimonial[]>([]);
	let loading = $state(true);
	let modalOpen = $state(false);
	let showLeaveButton = $state(false);

	const noteColors = [
		{ bg: '#fef08a', text: '#78350f', idText: '#a16207' },
		{ bg: '#fbcfe8', text: '#831843', idText: '#9d174d' },
		{ bg: '#bae6fd', text: '#0c4a6e', idText: '#075985' },
		{ bg: '#bbf7d0', text: '#14532d', idText: '#166534' },
		{ bg: '#fed7aa', text: '#7c2d12', idText: '#9a3412' }
	];

	const rotations = [-5, 3, -3, 6, -6, 4, -2, 7, -4, 2, -7, 5];

	function getNoteColor(index: number) {
		return noteColors[index % noteColors.length];
	}

	function getRotation(index: number) {
		return rotations[index % rotations.length];
	}

	function displayId(t: Testimonial) {
		if (t.showId && t.studentId) return t.studentId;
		return '2003xxx';
	}

	async function loadTestimonials() {
		loading = true;
		try {
			testimonials = await fetchTestimonials();
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		showLeaveButton = true;
		loadTestimonials();
	});
</script>

<svelte:head>
	<title>Testimonials · CUET ME L4T2</title>
	<meta name="description" content="Messages from the '20 batch about the CUET ME L4T2 papers archive." />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<main class="page-shell grow py-10 md:py-14">
		<header class="mb-10">
			<a href="/" class="text-text-muted hover:text-text-secondary mb-4 inline-flex items-center gap-1.5 text-sm transition-colors">
				← Home
			</a>
			<h1 class="text-4xl font-medium tracking-tight text-white md:text-5xl">Testimonials</h1>
			<p class="text-text-muted mt-2 text-sm">Messages from the '20 batch</p>
			{#if showLeaveButton}
				<div class="mt-5">
					<button class="ui-button ui-button-secondary" onclick={() => (modalOpen = true)}>
						Leave a message
					</button>
				</div>
			{/if}
		</header>

		<!-- Crossfade wrapper: grid stacking prevents layout shift during transition -->
		<div class="crossfade-wrapper">
			{#if loading}
				<div class="notes-grid" out:fade={{ duration: 250 }}>
					{#each { length: 8 } as _, i}
						<div
							class="note-card mb-6 animate-pulse"
							style="background-color: {noteColors[i % noteColors.length].bg}; opacity: 0.3; transform: rotate({getRotation(i)}deg);"
						>
							<div class="mb-2 h-4 rounded bg-black/20"></div>
							<div class="mb-2 h-4 w-3/4 rounded bg-black/20"></div>
							<div class="h-4 w-1/2 rounded bg-black/20"></div>
							<div class="ml-auto mt-6 h-3 w-16 rounded bg-black/15"></div>
						</div>
					{/each}
				</div>
			{:else if testimonials.length === 0}
				<div in:fade={{ duration: 250 }}>
					<p class="text-text-muted text-sm">No messages yet. Be the first.</p>
					{#if showLeaveButton}
						<button
							class="ui-button ui-button-primary mt-4"
							onclick={() => (modalOpen = true)}
						>
							Leave a message
						</button>
					{/if}
				</div>
			{:else}
				<div class="notes-grid" in:fade={{ duration: 250 }}>
					{#each testimonials as testimonial, i}
						{@const color = getNoteColor(i)}
						{@const rotation = getRotation(i)}
						<div
							class="note-card mb-6 break-inside-avoid"
							style="background-color: {color.bg}; transform: rotate({rotation}deg); color: {color.text};"
						>
							<p class="text-[1.2rem] leading-relaxed" style="font-family: 'Atma', cursive;">
								{testimonial.message}
							</p>
							<p
								class="mt-4 text-right text-sm font-medium opacity-60"
								style="font-family: 'Atma', cursive; color: {color.idText};"
							>
								{displayId(testimonial)}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<Footer />
</div>

<TestimonialModal bind:open={modalOpen} onsubmitted={loadTestimonials} />

<style>
	.crossfade-wrapper {
		display: grid;
	}

	.crossfade-wrapper > * {
		grid-area: 1 / 1;
	}

	.notes-grid {
		columns: 1;
		column-gap: 1.5rem;
	}

	@media (min-width: 480px) {
		.notes-grid {
			columns: 2;
		}
	}

	@media (min-width: 640px) {
		.notes-grid {
			columns: 3;
		}
	}

	@media (min-width: 1024px) {
		.notes-grid {
			columns: 4;
		}
	}

	.note-card {
		border-radius: 1rem;
		padding: 1.25rem 1.375rem 1rem;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.25),
			0 10px 30px rgba(0, 0, 0, 0.2);
		display: inline-block;
		width: 100%;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.note-card:hover {
		box-shadow:
			0 8px 16px rgba(0, 0, 0, 0.3),
			0 20px 40px rgba(0, 0, 0, 0.25);
	}
</style>
