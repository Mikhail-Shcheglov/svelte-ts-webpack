<script lang="ts">
</script>

<div class="star-counter">
  <p>3</p>
</div>

<style lang="scss">
  .star-counter {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/build/src/app/assets/images/star_counter.png');
    background-repeat: no-repeat;
    background-size: contain;
    p {
      font-size: 3.6rem;
      font-family: 'Nunito';
      @media screen and (max-width: 960px) {
        font-size: 2.7rem;
      }
    }
  }
</style>
