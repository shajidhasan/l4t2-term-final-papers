<script lang="ts">
	import '../app.css';

	import ToastRegion from '$lib/components/ToastRegion.svelte';

	let { children } = $props();
</script>

{@render children()}

<ToastRegion />
