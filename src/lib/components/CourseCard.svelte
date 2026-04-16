<script lang="ts">
	import Users from '@lucide/svelte/icons/users';
	import { resolve } from '$app/paths';

	import type { Course } from '$lib/types';
	import { getGradientForString } from '$lib/utilities';

	let { course }: { course: Course } = $props();

	const gradient = $derived(getGradientForString(course.code));
</script>

<a
	href={resolve(`/${course.code}`)}
	class="group border-border-subtle bg-card hover:bg-card-hover flex flex-col overflow-hidden rounded-[14px] border no-underline shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
>
	<!-- Padded content area -->
	<div class="flex-1 px-5 py-5">
		<!-- Top row: code pill + credits -->
		<div class="mb-9 flex items-start justify-between gap-3">
			<span class={`ui-pill ${gradient}`}>{course.code}</span>
			<span class="text-text-muted pt-0.5 text-xs font-medium tracking-wide"
				>{course.credits} credits</span
			>
		</div>

		<!-- Course title -->
		<h2 class="text-text-primary mb-6 text-xl leading-snug font-medium tracking-tight">
			{course.title}
		</h2>

		<!-- Instructors -->
		<div class="flex items-center gap-2.5">
			<span
				class="border-border-subtle text-text-muted inline-flex size-6.5 shrink-0 items-center justify-center rounded-md border bg-white/5"
			>
				<Users size={14} />
			</span>
			<span class="text-text-secondary text-[0.8rem] leading-snug">{course.instructors}</span>
		</div>
	</div>

	<!-- Colored bottom bar -->
	<div class={`h-0.75 w-full shrink-0 ${gradient}`}></div>
</a>
