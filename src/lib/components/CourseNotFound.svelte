<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
	<div
		class="border-border-subtle bg-card w-full max-w-md rounded-2xl border px-8 py-10 text-center"
	>
		<span class="ui-pill ui-pill-neutral mb-5 inline-block">Archive</span>
		<h1 class="text-text-primary mb-3 text-3xl font-medium tracking-tight">Course not found</h1>
		<p class="text-text-secondary mb-7 text-[0.9rem] leading-relaxed text-balance">
			The course you requested does not exist in this archive yet.
		</p>
		<a href={resolve('/')} class="ui-button ui-button-primary">Go Home</a>
	</div>
</div>
