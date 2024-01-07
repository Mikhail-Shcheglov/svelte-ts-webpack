<script lang="ts">
	export let src: string;
	export let isSelected = false;
</script>

<div
	class:selected={isSelected}
	class="card-item"
	on:click
	on:keydown={() => {}}
	aria-roledescription="meow"
	tabindex="0"
	role="gridcell"
>
	<img {src} alt="card" />
</div>

<style lang="scss">
	.card-item {
		aspect-ratio: 1 / 1;
		display: flex;
		justify-content: center;
		border-radius: 20px;
		box-shadow: 4px 4px 4px #00000018;
		background-color: whitesmoke;
		width: 8.9rem;
		padding: 2.1rem;

		&.selected {
			background-color: white;
			transform: scale(1.069);
			box-shadow: 6px 6px 12px #00000050;
			border: 1px solid gray;
			transition: transform 0.15s ease-out;
		}
		&:hover:not(.selected) {
			transition: none;
			transform: scale(1.025);
		}

		@media screen and (max-width: 640px) {
			width: 7.5rem;
			padding: 1.8rem;
			border-radius: 9px;
		}
	}
</style>
