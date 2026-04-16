<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import CourseHeader from '$lib/components/CourseHeader.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import { courses } from '$lib/courses';
	import { getAvailableBatches } from '$lib/papers';
	import { getGradientForString } from '$lib/utilities';

	const courseCode = $derived(page.params.courseCode as string);
	const course = $derived(courses.find((c) => c.code === courseCode));
	const batches = $derived(getAvailableBatches(courseCode) ?? []);

	/* Derive default batch directly — avoids the 1-frame flash of "No papers" */
	const defaultBatch = $derived(batches[0] ?? '');
	let userSelectedBatch = $state<string | null>(null);

	/* Reset user selection when navigating to a different course */
	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		courseCode;
		userSelectedBatch = null;
	});

	const selectedBatch = $derived(
		userSelectedBatch && batches.includes(userSelectedBatch) ? userSelectedBatch : defaultBatch
	);
</script>

<svelte:head>
	{#if course}
		<title>{course.code} - {course.title} | CUET ME L4T2</title>
		<meta
			name="description"
			content="Browse {course.title} ({course.code}) question papers from different batches. Access past exam questions and solutions for CUET Mechanical Engineering students."
		/>
	{:else}
		<title>Course Not Found | CUET ME L4T2</title>
		<meta name="description" content="The requested course could not be found in our database." />
	{/if}
</svelte:head>

{#if course}
	<CourseHeader {course} />

	<div class="page-shell py-6 md:py-8">
		<!-- Batch tabs — centered -->
		<div class="flex justify-center">
			<div
				class="border-border-subtle flex flex-wrap justify-center gap-2 rounded-xl border bg-white/3 p-2"
			>
				{#each batches as batch (batch)}
					<button
						type="button"
						class={`ui-tab ${selectedBatch === batch ? `${getGradientForString(batch)} ui-tab-active` : 'ui-tab-idle'}`}
						onclick={() => (userSelectedBatch = batch)}
					>
						'{batch} Batch
					</button>
				{/each}
			</div>
		</div>

		<!-- Paper content -->
		<section class="mt-8">
			{#if selectedBatch}
				<div class="course-content-enter">
					<Questions batch={selectedBatch} {courseCode} />
				</div>
			{:else}
				<!-- Skeleton placeholder while waiting (only shows if course truly has no data) -->
				<div class="grid items-start gap-8 lg:grid-cols-2">
					{#each [1, 2] as col (col)}
						<div class="flex flex-col gap-4">
							<!-- Skeleton section heading -->
							<div class="skeleton-shimmer h-6 w-24 rounded-md"></div>
							{#each [1, 2] as card (card)}
								<div class="border-border-subtle bg-card overflow-hidden rounded-xl border">
									<!-- Skeleton set header -->
									<div
										class="border-border-subtle flex items-center gap-3 border-b bg-white/2 px-4 py-3"
									>
										<div class="skeleton-shimmer h-4 w-12 rounded"></div>
										<div class="flex gap-1.5">
											<div class="skeleton-shimmer h-5 w-20 rounded-md"></div>
											<div class="skeleton-shimmer h-5 w-16 rounded-md"></div>
										</div>
									</div>
									<!-- Skeleton questions -->
									{#each [1, 2, 3] as q (q)}
										<div class="border-border-subtle border-b px-4 py-3.5">
											<div class="flex items-start gap-3">
												<div
													class="skeleton-shimmer mt-[0.2em] h-5 w-[1.875rem] shrink-0 rounded"
												></div>
												<div class="flex flex-1 flex-col gap-2">
													<div class="skeleton-shimmer h-4 w-full rounded"></div>
													<div class="skeleton-shimmer h-4 w-3/4 rounded"></div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>

	<FloatingAnchor onclick={() => goto(resolve('/'), { replaceState: true })}>
		<ArrowLeft class="size-4" />
		<span>Back</span>
	</FloatingAnchor>
{:else}
	<CourseNotFound />
{/if}

<Footer />

<style>
	/* ── Skeleton shimmer ─────────────────────────────────── */
	.skeleton-shimmer {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.04) 25%,
			rgba(255, 255, 255, 0.08) 50%,
			rgba(255, 255, 255, 0.04) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	/* ── Fade-slide-in for content ────────────────────────── */
	.course-content-enter {
		animation: contentFadeIn 0.35s ease-out both;
	}

	@keyframes contentFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
