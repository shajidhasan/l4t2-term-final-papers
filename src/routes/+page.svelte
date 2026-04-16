<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { courses } from '$lib/courses';
</script>

<svelte:head>
	<title>CUET ME · L4T2 - Term Final Papers Archive</title>
	<meta
		name="description"
		content="Term final papers archive for CUET Mechanical Engineering Level 4 Term 2 courses. Browse question papers including ME463."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<main class="page-shell grow py-10 md:py-14">
		<!-- Hero -->
		<header class="mb-10">
			<h1 class="text-4xl font-medium tracking-tight text-white md:text-5xl">CUET ME · L4T2</h1>
			<p class="text-text-muted mt-2 text-sm">Term final papers archive · From '19 to '15 batch</p>
		</header>

		<!-- Courses grid -->
		<section>
			<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{#each courses as course (course.code)}
					<CourseCard {course} />
				{/each}
			</div>
		</section>
	</main>

	<Footer />
</div>
