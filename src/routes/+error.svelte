<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import Footer from '$lib/components/Footer.svelte';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Something went wrong');

	const title = $derived(status === 404 ? 'Page not found' : 'Something went wrong');
	const description = $derived(
		status === 404
			? 'The page you requested does not exist in this archive.'
			: 'An unexpected error occurred. You can head back and try again.'
	);
</script>

<svelte:head>
	<title>{status} · {title} | CUET ME L4T2</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<main class="flex grow items-center justify-center px-4 py-12">
		<div
			class="border-border-subtle bg-card w-full max-w-md rounded-2xl border px-8 py-10 text-center"
		>
			<span class="ui-pill ui-pill-neutral mb-5 inline-block font-mono tracking-wider">
				Error {status}
			</span>
			<h1 class="text-text-primary mb-3 text-3xl font-medium tracking-tight">
				{title}
			</h1>
			<p class="text-text-secondary mb-7 text-[0.9rem] leading-relaxed text-balance">
				{description}
			</p>

			{#if status !== 404 && message && message !== title}
				<p
					class="border-border-subtle text-text-muted mb-7 rounded-lg border bg-white/3 px-3 py-2 font-mono text-xs break-words"
				>
					{message}
				</p>
			{/if}

			<a href={resolve('/')} class="ui-button ui-button-primary">Go Home</a>
		</div>
	</main>

	<Footer />
</div>
