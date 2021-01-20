<template>
  <transition name="answer">
    <div
      class="notification mt-5 mb-5"
      :class="{
        'is-success': correctlyAnswered,
        'is-danger': !correctlyAnswered,
      }"
      v-if="hasAnswered"
    >
      <h4 v-if="correctlyAnswered">Correct!</h4>
      <h4 v-else>Wrong!</h4>
      <p>Your answer: {{ chosenAnswerName }}.</p>
      <p>Correct answer: {{ correctAnswerName }}.</p>
      <p class="info">
        <a :href="wikiLink(correctAnswer)" target="_blank"
          >More information about this language on Wikipedia</a
        >
      </p>
    </div>
  </transition>
  <transition name="button" @click="next">
    <div class="has-text-centered" v-if="hasAnswered">
      <button class="button is-link is-medium">Next</button>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["next"],
  props: [
    "hasAnswered",
    "correctAnswer",
    "correctlyAnswered",
    "correctAnswerName",
    "chosenAnswerName",
  ],
  methods: {
    wikiLink(code) {
      return `${this.API}/wikipedia/${code}/`;
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  max-width: 500px;
  margin: auto;
  font-size: 1.2rem;
}

h4 {
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 0;
}

.info {
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;

  a:hover,
  a:active {
    text-decoration: none;
  }
}

.answer-enter-from,
.answer-leave-to {
  transform: scaleY(0);
}

.answer-enter-to,
.answer-leave-from {
  transform: scaleY(1);
}

.answer-enter-active,
.answer-leave-active {
  transition: transform 0.2s;
  transform-origin: top;
}

.button-enter-from,
.button-leave-to {
  transform: scaleY(0);
}

.button-enter-to,
.button-leave-from {
  transform: scaleY(1);
}

.button-enter-active,
.button-leave-active {
  transition: transform 0.2s;
}
</style>