<template>
  <div class="has-text-centered" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div class="columns" v-else>
    <div class="column">
      <base-card>
        <h3>Play with texts</h3>
        <p>
          Guess the language of texts! There are {{ countData.texts }} texts in
          {{ countData.text_languages }} languages.
        </p>
        <p class="has-text-centered">
          <router-link
            :to="{ name: 'text' }"
            class="button is-medium is-primary"
            >Play</router-link
          >
        </p>
      </base-card>
    </div>
    <div class="column">
      <base-card>
        <h3>Play with songs</h3>
        <p>
          Guess the language of songs! There are {{ countData.songs }} songs in
          {{ countData.song_languages }} languages.
        </p>
        <p class="has-text-centered">
          <router-link
            :to="{ name: 'song' }"
            class="button is-medium is-primary"
            >Play</router-link
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
    this.loadCountData();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-top: 0;
}
</style>