<template>
  <base-card mode="narrow">
    <h3>Play with {{ type }}s</h3>
    <div class="score" ref="score">Your score: {{ score }}/{{ numberOfQuestions }}</div>
    <div class="has-text-centered mt-5">
      <button class="button is-link is-medium mr-4" @click="playAgain">
        Play again
      </button>
      <router-link :to="{ name: 'home' }" class="button is-link is-medium"
        >Main page</router-link
      >
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['score', 'numberOfQuestions', 'type'],
  methods: {
    playAgain() {
      this.$emit('play-again');
    }
  },
  mounted() {
    this.$refs.score.scrollIntoView({behavior: 'smooth'});
  }
}
</script>

<style lang="scss" scoped>
.score {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 3rem 0;
}
</style>