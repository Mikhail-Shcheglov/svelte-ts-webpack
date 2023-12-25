<script lang="ts">
  import Clock from '../clock/clock.svelte';
  import Deck from '../deck/deck.svelte';
  import StarCounter from '../star-counter/star-counter.svelte';
</script>

<div class="game-ui">
  <StarCounter />
  <Clock />
  <Deck />
</div>

<style lang="scss">
  .game-ui {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 40px;
    justify-content: space-between;

    @media screen and (min-width: 640px) and (max-width: 960px), (max-width: 480px) {
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 20px;
      grid-template-rows: none;
    }

    @media screen and (max-width: 640px) {
      row-gap: 15px;
    }
  }

  :global(.game-ui div) {
    aspect-ratio: 1 / 1;
    width: 9.3rem;

    @media screen and (max-width: 960px) {
      width: 7rem;
      margin: 5px;
    }
  }
</style>
