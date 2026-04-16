<script lang="ts">
	import Download from '@lucide/svelte/icons/download';
	import Search from '@lucide/svelte/icons/search';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Course } from '$lib/types';
	import { getGradientForString } from '$lib/utilities';

	let { course }: { course: Course } = $props();
</script>

<div class="border-border-subtle bg-base/85 sticky top-0 z-80 border-b backdrop-blur-[20px]">
	<div class="page-shell flex items-center justify-between gap-3 py-2.5">
		<!-- Left: pill + title -->
		<div class="flex min-w-0 flex-1 items-center gap-3">
			<span class={`ui-pill shrink-0 ${getGradientForString(course.code)}`}>{course.code}</span>
			<p class="text-text-secondary truncate text-sm font-medium">
				{course.title}
			</p>
		</div>

		<!-- Right: actions -->
		<div class="flex shrink-0 items-center gap-2">
			<a
				href={resolve(`/${course.code}/search`)}
				class={`ui-button ${page.url.pathname === `/${course.code}/search` ? getGradientForString('Search') : 'ui-button-secondary'}`}
			>
				<Search size={14} />
				<span class="hidden sm:inline">Search</span>
			</a>
			<a
				href={resolve(`/papers/${course.code}.pdf`)}
				download
				class="ui-button ui-button-secondary"
			>
				<Download size={14} />
				<span class="hidden sm:inline">Download</span>
				<span class="sm:hidden">PDF</span>
			</a>
		</div>
	</div>
</div>
