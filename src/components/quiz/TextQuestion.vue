<template>
  <base-card>
    <template #default>
      <h3 ref="question">
        {{
          $t("game.currentQuestion", {
            num: currentRound,
            total: numberOfQuestions,
          })
        }}
      </h3>
      <div
        class="text-sample"
        :lang="currentQuestion.correctAnswer"
        :dir="currentQuestion.direction"
      >
        {{ currentQuestion.text }}
      </div>
    </template>
    <template #footer>
      <p>
        {{ $t("game.source") }}
        <a v-if="hasAnswered" :href="currentQuestion.source" target="_blank">{{
          currentQuestion.source
        }}</a>
        <span v-else>{{ $t("game.pickAnswer") }}</span>
      </p>
      <p v-if="currentQuestion.license">
        {{ $t('game.license') }}
        <a :href="currentQuestion.license.url" target="_blank">{{
          currentQuestion.license.name
        }}</a>
      </p>
    </template>
  </base-card>
</template>

<script>
export default {
  props: [
    "currentRound",
    "numberOfQuestions",
    "hasAnswered",
    "currentQuestion",
  ],
  mounted() {
    this.$refs.question.scrollIntoView({ behavior: "smooth" });
  },
};
</script>

<style lang="scss" scoped>
.text-sample {
  font-size: 1.5rem;
  border: 1px solid #f4f4f4;
  background: #fcfcfc;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 0.2em 0.4em -0.06em rgba(10, 10, 10, 0.06);
  margin: 1.5rem 0;
}

@media only screen and (max-width: 600px) {
  .text-sample {
    font-size: 1.2rem;
  }
}
</style>