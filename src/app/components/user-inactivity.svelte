<script lang="ts">
	import { sorts } from 'src/app/store/coffee-sorts/coffee-sorts';
	import { INACTIVE_INTERVAL_MS } from '../constants';
	import { onDestroy } from 'svelte';

	const wait = () => setInterval(sorts.loadOne, INACTIVE_INTERVAL_MS);

	let timer = wait();

	const resetIdle = () => {
		clearInterval(timer);
		timer = wait();
	};

	onDestroy(() => clearInterval(timer));
</script>

<svelte:document
	on:mousemove={resetIdle}
	on:mousedown={resetIdle}
	on:mouseup={resetIdle}
	on:keydown={resetIdle}
	on:keyup={resetIdle}
	on:focus={resetIdle}
	on:wheel={resetIdle}
/>
