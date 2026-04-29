<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Question from '$lib/components/TopicQuestion.svelte';
	import { courses } from '$lib/courses';
	import { getGradientForString, slugify } from '$lib/utilities';

	import { getGroupsByTopic, getSetsByTopic, getTopicNameFromSlug } from './utils';

	const slug = $derived(page.params.topic as string);
	const courseCode = $derived(page.params.courseCode as string);
	const course = $derived(courses.find((c) => c.code === courseCode));
	const sets = $derived(getSetsByTopic(slug, courseCode));
	const groups = $derived(getGroupsByTopic(slug, courseCode));
	const topic = $derived(getTopicNameFromSlug(slug, courseCode) ?? slug.replaceAll('_', ' '));

	let tab: 'sets' | 'questions' = $state('sets');
</script>

<svelte:head>
	{#if course}
		<title>{topic} - {course.code} | CUET ME L4T2</title>
		<meta
			name="description"
			content="Browse {topic} questions from {course.title} ({course.code}). View question sets and individual questions organized by batch for CUET Mechanical Engineering students."
		/>
	{:else}
		<title>Topic Not Found | CUET ME L4T2</title>
		<meta name="description" content="The requested topic could not be found in our database." />
	{/if}
</svelte:head>

{#if course}
	<div class="mx-auto flex min-h-screen max-w-4xl flex-col">
		<main class="page-shell grow py-6 md:py-10">
			<!-- Topic banner -->
			<div class="topic-banner-wrap relative mb-8">
				<!-- Rotated course code on left edge -->
				<span
					class={`ui-pill absolute top-1/2 -left-1 z-10 origin-center -translate-y-1/2 -rotate-90 shadow-lg ${getGradientForString(course.code)}`}
				>
					{course.code}
				</span>

				<!-- Gradient banner -->
				<div
					class={`topic-banner flex items-center rounded-xl py-5 pr-5 pl-12 md:py-7 md:pr-8 md:pl-14 ${getGradientForString(topic ?? 'Default')}`}
				>
					<h1 class="min-w-0 text-2xl font-medium tracking-tight text-white italic md:text-4xl">
						{topic}
					</h1>
				</div>
			</div>

			<!-- View mode tabs -->
			<div class="mb-6 flex items-center justify-center gap-4">
				<div class="flex justify-center gap-1.5">
					<button
						type="button"
						class={`ui-tab ${tab === 'sets' ? `${getGradientForString('Sets')} ui-tab-active` : 'ui-tab-idle'}`}
						onclick={() => (tab = 'sets')}
					>
						Sets
					</button>
					<button
						type="button"
						class={`ui-tab ${tab === 'questions' ? `${getGradientForString('Questions')} ui-tab-active` : 'ui-tab-idle'}`}
						onclick={() => (tab = 'questions')}
					>
						Questions
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="mb-16">
				{#if tab === 'sets'}
					<div class="flex flex-col gap-3.5">
						{#each sets as set (`${set.batch}-${set.number}`)}
							{@const topics = new Set(set.questions.map((q) => q.topic))}
							<div class="border-border-subtle bg-card overflow-hidden rounded-xl border">
								<header
									class="border-border-subtle flex flex-nowrap items-center gap-3.5 border-b bg-white/2 px-4 py-2.5"
								>
									<div class="flex shrink-0 items-center gap-1.5">
										<span class="text-text-muted text-xs font-medium whitespace-nowrap"
											>'{set.batch} ·</span
										>
										<span class="text-text-muted text-xs font-medium whitespace-nowrap"
											>Set {set.number}</span
										>
									</div>
									<!-- Scrollable topic pills -->
									<div
										class="flex flex-1 items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
									>
										{#each topics as t (t)}
											<a
												href={resolve(`/${courseCode}/${slugify(t)}`)}
												class={`ui-pill shrink-0 text-[0.6875rem] font-medium tracking-wide no-underline transition-opacity duration-150 hover:opacity-85 ${getGradientForString(t ?? 'Default')}`}
											>
												{t ?? 'Unknown'}
											</a>
										{/each}
									</div>
								</header>
								<div class="flex flex-col">
									{#each set.questions as question (question.id)}
										<Question {question} />
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex flex-col gap-3.5">
						{#each groups as group (group.batch)}
							<div class="border-border-subtle bg-card overflow-hidden rounded-xl border">
								<div
									class="border-border-subtle flex items-center justify-between gap-3 border-b bg-white/2 px-4 py-3"
								>
									<h2 class="text-text-primary text-[0.9375rem] font-medium">
										'{group.batch} Batch
									</h2>
									<span class={`ui-pill ${getGradientForString(group.batch)}`}>
										{group.questions.reduce((acc, q) => acc + q.marks, 0).toFixed(2)} marks
									</span>
								</div>
								<div class="flex flex-col">
									{#each group.questions as question (question.id)}
										<Question {question} showSetNumber />
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<FloatingAnchor
				onclick={() => goto(resolve('/[courseCode]', { courseCode }), { replaceState: true })}
			>
				<ArrowLeft class="size-4" />
				<span>Back</span>
			</FloatingAnchor>
		</main>
	</div>
{:else}
	<CourseNotFound />
{/if}
<Footer />
