<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { SearchResult } from 'minisearch';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Search from '@lucide/svelte/icons/search';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import CourseHeader from '$lib/components/CourseHeader.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import SearchQuestion from '$lib/components/SearchQuestion.svelte';
	import { courses } from '$lib/courses';
	import { miniSearch } from '$lib/search';
	import type { Question } from '$lib/types';
	import { debounce } from '$lib/utilities';

	const courseCode = $derived(page.params.courseCode as string);
	const course = $derived(courses.find((c) => c.code === courseCode));

	type Results = (Question & SearchResult)[];

	let searchQuery = $state('');
	let searchResults: Results = $state([]);
	let top = $derived(searchQuery.trim().length > 0);
	let searchElement: HTMLInputElement | undefined = $state(undefined);

	const search = (query: string) => {
		searchResults = (
			miniSearch.search(query, {
				prefix: true,
				filter: (result) => result.courseCode === courseCode
			}) as Results
		).sort((a, b) => b.id.localeCompare(a.id));
	};

	const debouncedSearch = debounce(search, 500);

	$effect(() => {
		debouncedSearch(searchQuery);
	});

	onMount(() => {
		searchElement?.focus();
	});
</script>

<svelte:head>
	{#if course}
		<title>Search {course.code} Questions | CUET ME L4T2</title>
		<meta
			name="description"
			content="Search through {course.title} ({course.code}) questions and find specific topics, problems, or solutions from past exam papers."
		/>
	{:else}
		<title>Search - Course Not Found | CUET ME L4T2</title>
		<meta name="description" content="The requested course could not be found for searching." />
	{/if}
</svelte:head>

{#if course}
	<CourseHeader {course} />

	<div class="page-shell relative min-h-[calc(100vh-10rem)] pt-6 pb-12">
		<!-- Search bar — centered, animates up on type -->
		<div
			class="absolute left-1/2 z-20 w-full max-w-[42rem] -translate-x-1/2 px-4 transition-[top] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
			class:top-[42%]={!top}
			class:top-6={top}
		>
			{#if !top}
				<div class="mb-7 text-center" out:fade in:fade={{ delay: 800 }}>
					<h2 class="text-text-primary text-3xl font-normal tracking-tight md:text-4xl">
						Search {courseCode}
					</h2>
				</div>
			{/if}

			<div
				class="border-border-muted bg-card flex items-center gap-3 rounded-xl border px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
			>
				<span
					class="text-text-secondary inline-flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-white/8"
				>
					<Search size={15} />
				</span>
				<input
					bind:this={searchElement}
					bind:value={searchQuery}
					class="text-text-primary placeholder:text-text-muted min-w-0 flex-1 border-none bg-transparent text-[0.9375rem] outline-none"
					type="search"
					name="search-input"
					placeholder="Search by topic, phrase, or formula"
					autocomplete="off"
					spellcheck="false"
				/>
			</div>

			{#if !top}
				<p class="text-text-muted mt-3 text-center text-[0.8125rem] italic" transition:fade>
					"Good questions outrank easy answers."
				</p>
			{/if}
		</div>

		{#if top}
			<section class="mt-28" in:fade out:fade>
				<p class="text-text-muted mb-3 text-[0.8125rem]">
					{searchResults.length} matching question{searchResults.length === 1 ? '' : 's'}
				</p>

				{#if searchResults.length > 0}
					<div class="border-border-subtle bg-card flex flex-col overflow-hidden rounded-xl border">
						{#each searchResults as question (question.id)}
							<SearchQuestion {question} />
						{/each}
					</div>
				{:else}
					<div class="border-border-subtle bg-card text-text-muted rounded-xl border p-6 text-sm">
						No matching questions found for "{searchQuery}".
					</div>
				{/if}
			</section>
		{/if}
	</div>
{:else}
	<CourseNotFound />
{/if}

<FloatingAnchor
	onclick={() => goto(resolve('/[courseCode]', { courseCode }), { replaceState: true })}
>
	<ArrowLeft class="size-4" />
	<span>Back</span>
</FloatingAnchor>
