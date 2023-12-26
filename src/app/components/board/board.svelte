<script lang="ts">
	import CardItem from '../card-item/card-item.svelte';

	export let cardIcons: string[] = [];
	let selectedIndex = Math.floor(Math.random() * 16);
	let clickHandler = (event: MouseEvent, index: number) => {
		selectedIndex = index;
	};
</script>

<div class="board">
	{#each cardIcons as card, index (card)}
		<CardItem
			src={card}
			on:click={(e) => clickHandler(e, index)}
			isSelected={selectedIndex === index}
		/>
	{/each}
</div>

<style lang="scss">
	.board {
		display: grid;
		grid-template-areas:
			'1fr 1fr 1fr 1fr'
			'1fr 1fr 1fr 1fr'
			'1fr 1fr 1fr 1fr';
		gap: 27px;
		margin: 0 90px;

		@media screen and (max-width: 1200px) {
			margin: 25px 54px;
			gap: 24px;
		}
		@media screen and (max-width: 960px) {
			margin: 25px 54px;
			gap: 20px;
		}
		@media screen and (max-width: 640px) {
			margin: 25px 21px;
			gap: 9px;
		}
	}
</style>
