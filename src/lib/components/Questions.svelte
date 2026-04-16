<script lang="ts">
	import { resolve } from '$app/paths';

	import Question from '$lib/components/Question.svelte';
	import { papersCollection } from '$lib/papers';
	import { getGradientForString } from '$lib/utilities';

	let { batch, courseCode }: { batch: string; courseCode: string } = $props();

	const coursePapers = $derived(papersCollection[courseCode] || []);
	const paper = $derived(coursePapers.find((paper) => paper.batch === batch)?.paper);
	const sectionNames = ['A', 'B'];

	const slugify = (topic: string | undefined) => {
		return (topic ?? '').replaceAll(' ', '_').toLowerCase();
	};
</script>

<div class="grid items-start gap-8 lg:grid-cols-2">
	{#if paper}
		{#each paper.sections as section, i (section.name || sectionNames[i])}
			<section class="flex min-w-0 flex-col">
				<h2 class="text-text-primary mb-3.5 text-[1.375rem] font-normal tracking-tight">
					Section {sectionNames[i]}
				</h2>

				<div class="flex flex-col gap-4">
					{#each section.sets as set (set.number)}
						{@const topics = new Set(set.questions.map((q) => q.topic))}
						<div class="border-border-subtle bg-card overflow-hidden rounded-xl border">
							<!-- Set header: "Set N" + scrollable topic pills -->
							<header
								class="border-border-subtle flex items-center gap-3 border-b bg-white/2 px-4 py-3"
							>
								<span
									class="text-text-secondary shrink-0 text-[0.8125rem] font-medium whitespace-nowrap"
									>Set {set.number}</span
								>
								<div
									class="flex flex-1 items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
								>
									{#each topics as topic (topic)}
										<a
											href={resolve(`/${courseCode}/${slugify(topic)}`)}
											class={`ui-pill shrink-0 text-[0.6875rem] font-medium tracking-wide no-underline transition-opacity duration-150 hover:opacity-85 ${getGradientForString(topic ?? 'Default')}`}
										>
											{topic ?? 'Unknown'}
										</a>
									{/each}
								</div>
							</header>

							<!-- Questions -->
							<div class="questions-divider flex flex-col">
								{#each set.questions as question (question.id)}
									<Question {question} />
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	{/if}
</div>

<style>
	/* 1px gap-based divider pattern between question items */
	.questions-divider {
		gap: 1px;
		background: var(--color-border-subtle);
	}

	.questions-divider > :global(*) {
		background: var(--color-card);
	}
</style>
