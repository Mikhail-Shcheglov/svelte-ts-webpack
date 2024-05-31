<script lang="ts">
	import { onMount } from 'svelte';

	import { sorts } from 'src/app/store/coffee-sorts/coffee-sorts';
	import { autoScroll } from './actions/auto-scroll';
	import ButtonAdd from './components/button-add.svelte';
	import CoffeeSortCard from './components/coffee-sort-card.svelte';
	import UserInactivity from './components/user-inactivity.svelte';

	onMount(sorts.loadOne);
</script>

<main class="page" use:autoScroll>
	<UserInactivity />

	<div class="page__coffe-sorts">
		{#each $sorts.data as sort (sort.id)}
			<CoffeeSortCard {...sort} />
		{/each}
	</div>

	<div class="page__btn-add">
		<ButtonAdd disabled={$sorts.loading} on:click={sorts.loadOne} />
	</div>
</main>

<style lang="less">
	.page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50px;
		padding-bottom: 50px;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 6px;
			background-color: #070023;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background-color: #999;
		}

		&__btn-add {
			margin-top: 50px;
		}

		&__coffe-sorts {
			display: flex;
			flex-direction: column;
			row-gap: 40px;
			width: 300px;
		}
	}
</style>
