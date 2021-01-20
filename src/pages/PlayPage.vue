<template>
  <quiz-component
    :type="$route.name"
    ref="quizComponent">
  </quiz-component>
</template>

<script>
import QuizComponent from "../components/quiz/QuizComponent";

export default {
  components: { QuizComponent },
  beforeRouteLeave(_to, _from) {
    return this.$refs.quizComponent.prepareToExit();
  },
};
</script>