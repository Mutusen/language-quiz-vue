<template>
  <base-card mode="narrow">
    <h3 v-if="gameModeText">{{ $t('main.playTexts') }}</h3>
    <h3 v-else>{{ $t('main.playSongs') }}</h3>
    <div class="score" ref="score">{{ $t('game.yourScore') }} {{ score }}/{{ numberOfQuestions }}</div>
    <div class="has-text-centered mt-5">
      <button class="button is-link is-medium mr-4" @click="playAgain">
        {{ $t('game.playAgain') }}
      </button>
      <router-link :to="{ name: 'home' }" class="button is-link is-medium"
        >{{ $t('game.mainPage') }}</router-link
      >
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['score', 'numberOfQuestions', 'gameModeText'],
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