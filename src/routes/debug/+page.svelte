<script lang="ts">
	import RenderMarkdown from '$lib/components/RenderMarkdown.svelte';
</script>

<svelte:head>
	<title>Debug Page | CUET ME L4T2</title>
	<meta
		name="description"
		content="Debug page for testing markdown rendering and other development features."
	/>
</svelte:head>

<div class="prose prose-invert mx-auto">
	<RenderMarkdown
		markdown="What do you mean by forward kinematics and reverse kinematics? Draw a 2R planar robot such that first joint lies at the origin of XY plane. Find the values of joint angles ($\\Theta_1$ and $\\Theta_2$) for the robot when the gripper position is at (3,2). Given that the link lengths are $a_1 = 3$ m and $a_2= 1$ m."
	/>
</div>
