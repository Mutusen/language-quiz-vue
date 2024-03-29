<template>
  <transition name="slide" mode="out-in">
    <base-card mode="narrow" v-if="!gameStarted">
      <h3 v-if="gameModeText">{{ $t('main.playTexts') }}</h3>
      <h3 v-else>{{ $t('main.playSongs') }}</h3>
      <form @submit.prevent="startGame">
        <div class="field">
          <label class="label">{{ $t('game.numberQuestions') }}</label>
          <div class="control">
            <div class="select">
              <select v-model="numberOfQuestions">
                <option v-for="num in numbersOfQuestions" :key="num">
                  {{ num }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('game.numberAnswers') }}</label>
          <div class="control">
            <div class="select">
              <select v-model="numberOfPossibleAnswers">
                <option v-for="num in numbersOfPossibleAnswers" :key="num">
                  {{ num }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="difficult" />
              {{ $t('game.difficult') }}
            </label>
          </div>
        </div>
        <p v-if="gameModeSong"><strong>{{ $t('game.dontLook') }}</strong></p>

        <div class="control has-text-centered mt-5">
          <button class="button is-link is-medium">{{ $t('game.start') }}</button>
        </div>
      </form>
    </base-card>
    <section v-else-if="isLoading">
      <base-card :mode="{ video: gameModeSong }">
        <h3>{{ $t('game.currentQuestion', {num: currentRound, total: numberOfQuestions}) }}</h3>
        <div class="has-text-centered">
          <base-spinner></base-spinner>
        </div>
      </base-card>
    </section>

    <section v-else-if="!gameEnded">
      <text-question
        v-if="gameModeText"
        :currentRound="currentRound"
        :numberOfQuestions="numberOfQuestions"
        :hasAnswered="hasAnswered"
        :currentQuestion="currentQuestion"
      ></text-question>
      <song-question
        v-else
        :currentRound="currentRound"
        :numberOfQuestions="numberOfQuestions"
        :hasAnswered="hasAnswered"
        :currentQuestion="currentQuestion"
        :hideVideo="hideVideo"
      ></song-question>

      <answer-buttons
        :choices="currentQuestion.choices"
        :correctAnswer="currentQuestion.correctAnswer"
        :hasAnswered="hasAnswered"
        :errorReportButton="gameModeSong"
        :autoScroll="gameModeSong"
        @answer-picked="checkAnswer($event)"
        @error-reported="reportError()"
      >
      </answer-buttons>

      <results-card
        :hasAnswered="hasAnswered"
        :correctAnswer="currentQuestion.correctAnswer"
        :correctlyAnswered="correctlyAnswered"
        :chosenAnswer="chosenAnswer"
        @next="nextRound"
        ref="results"
      ></results-card>
    </section>
    <section v-else>
      <score-card
        :gameModeText="gameModeText"
        :score="score"
        :numberOfQuestions="numberOfQuestions"
        @play-again="playAgain"
      >
      </score-card>
    </section>
  </transition>

  <pinned-message
    :show="showError"
    type="danger"
    @close="hideError"
    :timeout="6"
  >
    {{ $t('game.reportSent') }}
  </pinned-message>
</template>

<script>
import axios from "axios";
import { defineAsyncComponent } from 'vue';

import AnswerButtons from "./AnswerButtons.vue";
import ResultsCard from "./ResultsCard.vue";
import TextQuestion from "./TextQuestion.vue";
import SongQuestion from "./SongQuestion.vue";
const ScoreCard = defineAsyncComponent(() => import('./ScoreCard.vue'));

export default {
  components: {
    AnswerButtons,
    ResultsCard,
    ScoreCard,
    TextQuestion,
    SongQuestion,
  },
  props: ["type"],
  data() {
    return {
      // Quiz state
      isLoading: false,
      gameStarted: false,

      // Options
      numbersOfQuestions: [10, 20, 30, 40],
      numbersOfPossibleAnswers: [4, 6, 8, 10],
      numberOfQuestions: 10,
      numberOfPossibleAnswers: 4,
      difficult: false,

      // Current game
      pastQuestionsIds: [],
      currentRound: 1,
      currentQuestion: {},
      score: 0,
      chosenAnswer: null,
      showError: false,
    };
  },
  computed: {
    gameModeText() {
      return this.type === "text";
    },
    gameModeSong() {
      return this.type === "song";
    },
    hasAnswered() {
      return this.chosenAnswer !== null;
    },
    correctlyAnswered() {
      return this.chosenAnswer === this.currentQuestion.correctAnswer;
    },
    gameEnded() {
      return this.currentRound > this.numberOfQuestions;
    },
  },
  methods: {
    playAgain() {
      this.gameStarted = false;
      this.currentRound = 1;
      this.score = 0;
      this.pastQuestionsIds = [];
    },
    startGame() {
      this.gameStarted = true;
      this.startRound();
    },
    async startRound() {
      this.isLoading = true;
      this.chosenAnswer = null;

      const params = {
        choices: this.numberOfPossibleAnswers,
        difficult: this.difficult,
        pastQuestionsIds: this.pastQuestionsIds.join(),
      };

      const url =
        this.API + (this.gameModeText ? "/textquestion/" : "/songquestion/");
      await axios
        .post(url, params)
        .then((response) => {
          this.currentQuestion = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkAnswer(code) {
      this.chosenAnswer = code;
      if (this.correctlyAnswered) {
        this.score++;
      }
      this.$refs.results.scroll();

      // Inform the API that the text/song has been played, to update states
      const url =
        this.API +
        (this.gameModeText ? "/update-text-stats/" : "/update-song-stats/");
      const params = {
        id: this.currentQuestion.id,
        correct: this.correctlyAnswered,
      };
      axios.post(url, params);
    },
    nextRound() {
      this.pastQuestionsIds.push(this.currentQuestion.id);
      this.currentRound++;

      if (!this.gameEnded) {
        this.startRound();
      }
    },
    async reportError() {
      await axios.post(this.API + "/report-broken-video/", {
        id: this.currentQuestion.id,
      });
      this.showError = true;
      this.startRound();
    },
    hideError() {
      this.showError = false;
    },
    prepareToExit() {
      if (this.gameStarted && !this.gameEnded) {
        return window.confirm(this.$t('game.areYouSure'));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-active,
.slide-enter-active {
  transition: all .2s;
}
</style>