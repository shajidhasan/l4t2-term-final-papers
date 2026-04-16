<script lang="ts">
	import X from '@lucide/svelte/icons/x';
	import CheckCircle2 from '@lucide/svelte/icons/circle-check-big';
	import Info from '@lucide/svelte/icons/info';
	import AlertTriangle from '@lucide/svelte/icons/triangle-alert';
	import { fly, fade } from 'svelte/transition';

	import { toaster } from '$lib/toaster';

	const toneStyles = {
		success: 'bg-emerald-950/85 border-emerald-400/30 text-emerald-200',
		info: 'bg-sky-950/85 border-sky-400/30 text-sky-200',
		error: 'bg-red-950/85 border-red-300/30 text-red-200'
	} as const;

	const iconStyles = {
		success: 'bg-emerald-400/25 text-emerald-400',
		info: 'bg-sky-400/25 text-sky-400',
		error: 'bg-red-400/25 text-red-400'
	} as const;
</script>

<div
	class="pointer-events-none fixed top-4 right-4 z-120 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2"
>
	{#each $toaster as toast (toast.id)}
		<div
			in:fly={{ y: -12, duration: 200 }}
			out:fade={{ duration: 150 }}
			class={`pointer-events-auto flex items-center gap-2.5 rounded-[10px] border px-3.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-lg ${toneStyles[toast.tone]}`}
		>
			<div
				class={`inline-flex size-7 shrink-0 items-center justify-center rounded-md ${iconStyles[toast.tone]}`}
			>
				{#if toast.tone === 'success'}
					<CheckCircle2 size={14} />
				{:else if toast.tone === 'error'}
					<AlertTriangle size={14} />
				{:else}
					<Info size={14} />
				{/if}
			</div>

			<p class="min-w-0 flex-1 text-[0.8125rem] font-medium">{toast.title}</p>

			<button
				type="button"
				class="inline-flex size-6 cursor-pointer items-center justify-center rounded border-none bg-transparent text-inherit opacity-60 transition-all duration-150 hover:bg-white/10 hover:opacity-100"
				onclick={() => toaster.dismiss(toast.id)}
			>
				<X size={13} />
			</button>
		</div>
	{/each}
</div>
