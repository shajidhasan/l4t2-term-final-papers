<script lang="ts">
	import type { Snippet } from 'svelte';

	let { onclick, children }: { onclick?: () => void; children: Snippet } = $props();
</script>

<button
	class="text-text-primary fixed right-5 bottom-5 z-90 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-[rgba(30,30,36,0.95)] px-[1.125rem] py-2.5 text-[0.8125rem] font-medium shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-[12px] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:bg-[rgba(40,40,48,0.98)] active:translate-y-0"
	onclick={() => {
		if (onclick) onclick();
	}}
>
	{@render children()}
</button>
