<script lang="ts">
	import { onInterval } from 'src/app/utils/onInterval';

	let seconds = 90;
	let handleTick = () => {
		if (seconds > 0) {
			seconds -= 1;
		}
	};

	let formatTime = (seconds: number) => {
		var time = new Date(0);
		time.setSeconds(seconds); // specify value for SECONDS here
		var timeString = time.toISOString().substring(14, 19);
		return timeString;
	};

	onInterval(handleTick, 1000);
</script>

<div class="clock">
	<p>{formatTime(seconds)}</p>
</div>

<style lang="scss">
	.clock {
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url('/build/src/app/assets/images/clock.png');
		background-repeat: no-repeat;
		background-size: contain;
		p {
			font-size: 2.25rem;
			font-family: 'Nunito';
			@media screen and (max-width: 960px) {
				font-size: 1.8rem;
			}
		}
	}
</style>
