<template>
  <div class="has-text-centered" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div class="columns" v-else>
    <div class="column">
      <base-card>
        <h3>{{ $t('main.playTexts') }}</h3>
        <p>
          {{ $tc('main.guessTexts', countData.texts, { num: countData.texts, 'in_n_languages': 
            $tc('main.inNLanguages', countData.text_languages, { num: countData.text_languages })
          }) }}
        </p>
        <p class="has-text-centered">
          <router-link
            :to="{ name: 'text' }"
            class="button is-medium is-primary"
            >{{ $t('main.play') }}</router-link
          >
        </p>
      </base-card>
    </div>
    <div class="column">
      <base-card>
        <h3>{{ $t('main.playSongs') }}</h3>
        <p>
          {{ $tc('main.guessSongs', countData.songs, { num: countData.songs, 'in_n_languages': 
            $tc('main.inNLanguages', countData.song_languages, { num: countData.song_languages })
          }) }}
        </p>
        <p class="has-text-centered">
          <router-link
            :to="{ name: 'song' }"
            class="button is-medium is-primary"
            >{{ $t('main.play') }}</router-link
          >
        </p>
      </base-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    countData() {
      return this.$store.getters.countData;
    },
  },
  methods: {
    async loadCountData() {
      this.isLoading = true;
      await this.$store.dispatch("fetchCountData");
      this.isLoading = false;
    },
  },
  created() {
    const languageFromUrl = this.$route.params.language;
    if (languageFromUrl && this.$i18n.availableLocales.includes(languageFromUrl)) {
      this.$i18n.locale = languageFromUrl;
    }
    this.loadCountData();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-top: 0;
}
</style>