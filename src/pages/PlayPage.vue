<template>
  <quiz-component
    :type="type"
    ref="quizComponent">
  </quiz-component>
</template>

<script>
import QuizComponent from "../components/quiz/QuizComponent";

export default {
  props: ['type'],
  components: { QuizComponent },
  beforeRouteLeave(_to, _from) {
    return this.$refs.quizComponent.prepareToExit();
  }
};
</script>