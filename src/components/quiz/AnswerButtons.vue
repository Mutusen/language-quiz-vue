<template>
  <div ref="div">
    <button
      class="button is-info is-medium"
      v-for="[code, name] in sortedChoices"
      :key="code"
      @click="pickAnswer(code)"
      :disabled="disabled"
      :class="{
        'is-success': hasAnswered && code === correctAnswer,
        'is-danger': picked === code && code !== correctAnswer,
      }"
    >
      {{ name }}
    </button>

    <div class="error-report" v-if="errorReportButton" @click="reportError">
      <button
        class="button is-danger is-small"
        :disabled="disabled"
        :class="{ 'is-loading': error }"
      >
        {{ $t("game.brokenVideo") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  text-align: center;
  margin: 2rem 0;

  button {
    margin: 0.3rem;
    transition: all 0.1s;
  }
}

.error-report {
  margin-top: 0.6rem;
}
</style>

<script>
export default {
  emits: ["answer-picked", "error-reported"],
  props: {
    choices: {
      type: Object,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    hasAnswered: {
      type: Boolean,
      required: true,
    },
    errorReportButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      picked: null,
      error: false,
    };
  },
  computed: {
    disabled() {
      return this.hasAnswered || this.error;
    },
    sortedChoices() {
      const choicesWithName = [];
      this.choices.forEach((e) => {
        choicesWithName.push([
          e,
          this.$t("languages." + e),
        ]);
      });
      choicesWithName.sort(function (a, b) {
        return a[1] > b[1];
      });
      return choicesWithName;
    },
  },
  methods: {
    pickAnswer(answer) {
      this.picked = answer;
      this.$emit("answer-picked", answer);
    },
    reportError(answer) {
      this.error = true;
      this.$emit("error-reported", answer);
    },
  },
  mounted() {
    if (this.autoScroll) {
      this.$refs.div.scrollIntoView({ behavior: "smooth" });
    }
  },
};
</script>