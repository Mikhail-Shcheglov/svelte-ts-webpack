<script>
	export let disabled = false;
</script>

<button class="btn-add" class:btn-add__disable={disabled} on:click />

<style style="scss">
	.btn-add {
		position: relative;
		width: 80px;
		height: 80px;
		border: none;
		border-radius: 50%;
		background-color: #ff0000;
		transition: 0.2s ease-in;

		&:hover {
			background-color: #f76060;
			cursor: pointer;
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			background-color: #fff;
			transform: translate(-50%, -50%);
		}

		&::before {
			width: 50px;
			height: 5px;
		}

		&::after {
			width: 5px;
			height: 50px;
		}
	}

	/** SCSS почему-то подхватывает &__disable не как селектор класса, а селектор тега. */
	.btn-add__disable {
		cursor: not-allowed;
		background-color: grey;
		transform: scale(0.9);
		transition: 0.2s ease-out;
		pointer-events: none;

		&:hover {
			background-color: grey;
		}
	}
</style>
