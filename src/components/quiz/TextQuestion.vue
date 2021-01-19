<template>
  <base-card>
    <template #default>
      <h3>Question {{ currentRound }} of {{ numberOfQuestions }}</h3>
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
        Source:
        <a v-if="hasAnswered" :href="currentQuestion.source" target="_blank">{{
          currentQuestion.source
        }}</a>
        <span v-else>(pick an answer first)</span>
      </p>
      <p v-if="currentQuestion.license">
        License:
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
</style>