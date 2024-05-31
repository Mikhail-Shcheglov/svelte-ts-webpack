<script lang="ts">
	import type { CoffeSort } from 'src/app/interfaces/coffee-sort';
	import { scrollHorizontaly } from '../actions/scroll-horizontaly';

	export let blend_name: CoffeSort['blend_name'];
	export let intensifier: CoffeSort['intensifier'];
	export let notes: CoffeSort['notes'];
	export let origin: CoffeSort['origin'];
	export let variety: CoffeSort['variety'];

	$: notesArr = notes.split(', ');
</script>

<div class="coffe-sort-card">
	<img
		class="coffe-sort-card__img"
		src="https://loremflickr.com/500/500/coffee_bean"
		alt="Drink a cup of coffee"
		style="background-image:url(data:image/gif;base64,R0lGODlhCgAIAIABAN3d3f///yH5BAEAAAEALAAAAAAKAAgAAAINjAOnyJv2oJOrVXrzKQA7)"
	/>

	<div class="coffe-sort-card__intensifier">
		{intensifier}
	</div>

	<div class="coffe-sort-card__content">
		<div class="coffe-sort-card__origin">
			{origin}
		</div>

		<h4 class="coffe-sort-card__title">{blend_name}</h4>

		<div class="coffe-sort-card__variety">{variety}</div>

		<div class="coffe-sort-card__notes" use:scrollHorizontaly>
			{#each notesArr as note}
				<span class="coffe-sort-card__note">
					{note}
				</span>
			{/each}
		</div>
	</div>
</div>

<style lang="less">
	.coffe-sort-card {
		position: relative;
		width: 100%;
		max-width: 400px;
		border-radius: 10px;
		background-color: #fff;
		overflow: hidden;

		&__content {
			position: relative;
			padding: 15px;
		}

		&__intensifier {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 1.5rem;
			color: #fff;
			opacity: 0.8;
		}

		&__img {
			width: 100%;
			height: 300px;
		}

		&__note {
			padding: 5px 10px;
			text-wrap: nowrap;
			border-radius: 5px;
			background: green;
			color: white;
		}

		&__notes {
			display: flex;
			flex-wrap: nowrap;
			gap: 10px;
			overflow-x: auto;
			overflow-y: hidden;
		}

		&__notes::-webkit-scrollbar {
			height: 1px;
		}

		&__origin {
			color: gray;
		}

		&__title {
			margin-top: 10px;
			margin-bottom: 10px;
			font-size: 1.75rem;
			font-weight: 70;
		}

		&__variety {
			font-size: 1rem;
			margin-bottom: 20px;
			font-weight: 500;
		}
	}
</style>
