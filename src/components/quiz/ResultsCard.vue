<template>
  <transition name="answer">
    <section
      class="message mt-5 mb-5"
      :class="{
        'is-success': correctlyAnswered,
        'is-danger': !correctlyAnswered,
      }"
      ref="card"
      v-if="hasAnswered"
    >
      <header class="message-header">
        <h4 v-if="correctlyAnswered">{{ $t('game.correct') }}</h4>
        <h4 v-else>{{ $t('game.wrong') }}</h4>
      </header>

      <div class="message-body">
        <p>{{ $t('game.yourAnswer') }} {{ $t('languages.' + chosenAnswer) }}.</p>
        <p>{{ $t('game.rightAnswer') }} {{ $t('languages.' + correctAnswer) }}.</p>
        <p class="info">
          <a :href="wikiLink(correctAnswer)" target="_blank"
            >{{ $t('game.wikipedia') }}</a
          >
        </p>
      </div>
    </section>
  </transition>
  <transition name="button" @click="next">
    <div class="has-text-centered" v-if="hasAnswered">
      <button class="button is-link is-medium">{{ $t('game.next') }}</button>
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
    "chosenAnswer",
  ],
  methods: {
    wikiLink(code) {
      return `${this.API}/wikipedia/${this.$i18n.locale}/${code}/`;
    },
    next() {
      this.$emit("next");
    },
    scroll() {
      setTimeout(() => this.$refs.card.scrollIntoView({behavior: 'smooth'}), 210); // Wait until end of transition
    }
  },
};
</script>

<style lang="scss" scoped>
.message {
  max-width: 500px;
  margin: auto;
  font-size: 1.2rem;
}

h4 {
  font-weight: bold;
  text-align: center;
  font-size: 1.35rem;
  margin: 0;
}

.info {
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;

  a:hover,
  a:active {
    text-decoration: none !important;
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