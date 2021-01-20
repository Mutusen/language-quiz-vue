<template>
  <base-card mode="video">
    <template #default>
      <h3>Question {{ currentRound }} of {{ numberOfQuestions }}</h3>
      <figure class="image is-16by9">
        <iframe
          id="ytplayer"
          type="text/html"
          class="has-ratio"
          :src="currentQuestion.embed_url"
          allowfullscreen=""
          width="720"
          height="405"
          frameborder="0"
        ></iframe>
      </figure>
    </template>
    <template #footer v-if="hasAnswered">
      <div class="columns is-flex is-align-items-center">
        <div class="column">
          <p>Title: <span :lang="currentQuestion.correctAnswer">{{ currentQuestion.title }}</span></p>
          <p>Artist: <span :lang="currentQuestion.correctAnswer">{{ currentQuestion.artist }}</span></p>
        </div>
        <div class="column has-text-right">
          <a :href="currentQuestion.youtube_url" target="_blank" class="button is-info">Watch on YouTube</a>
        </div>
      </div>
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
  data() {
    return {
      reveal: false,
    };
  },
  methods: {
    revealVideo() {
      this.reveal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
figure {
  text-align: center;

  &:hover #hide-video {
    height: 89%;
    padding-top: 6.9%;
  }
}

#hide-video {
  width: 100%;
  background: #ccc;
  height: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  transition: all 200ms;
}

figure:hover #hide-video {
  height: 89%;
  padding-top: 6.9%;
}

@media only screen and (max-width: 1200px) {
  figure #hide-video {
    background: red !important;
  }
  figure:hover #hide-video {
    height: 88%;
    padding-top: 6.7%;
  }
}

@media only screen and (max-width: 768px) {
  figure #hide-video {
    background: blue !important;
  }
  figure:hover #hide-video {
    height: 83%;
    padding-top: 9.6%;
  }
}

@media only screen and (max-width: 576px) {
  figure:hover #hide-video {
    height: 79%;
    padding-top: 0;
  }
  .button.is-medium {
    font-size: 1.1rem;
  }
}
</style>