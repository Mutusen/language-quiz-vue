<template>
  <the-header></the-header>
  <main class="container">
    <div class="has-text-centered" v-if="loading">
      <base-spinner></base-spinner>
    </div>
    <router-view v-else></router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>
import TheFooter from "./components/TheFooter";
import TheHeader from './components/TheHeader.vue';

export default {
  components: { TheFooter, TheHeader },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  watch: {
    currentLocale(newVal, oldVal) {
      if (oldVal !== newVal) {
        localStorage.language = newVal;
        document.documentElement.lang = newVal;
        document.title = this.$t('languagequiz');
      }
    }
  },
};
</script>

<style lang="scss">
body {
  position: relative;
}

main {
  h2 {
    font-size: 2rem;
    margin-bottom: .4rem;
    margin-top: .8rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 2rem;
    margin: 1rem 0;
  }
}
</style>