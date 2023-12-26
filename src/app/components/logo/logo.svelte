<script lang="ts">
	import logo from '../../assets/images/game_logo.png';
</script>

<div class="logo">
	<img src={logo} alt="game logo" />
</div>

<style lang="scss">
	.logo {
		img {
			width: 7rem;
		}
		display: flex;
		align-items: center;

		@media screen and (max-width: 960px) {
			img {
				width: 5rem;
			}
		}
	}
</style>
