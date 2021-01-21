<template>
  <div class="select mt-4 mr-3">
    <select v-model="$i18n.locale" @change="setLanguage">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        :lang="locale"
      >
        {{ languageNames[locale] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  methods: {
    setLanguage() {
      localStorage.language = this.$i18n.locale;
    }
  },
  beforeCreate() {
    if (localStorage.language) {
      this.$i18n.locale = localStorage.language;
    }
    else {
      // Get preferred language from browser
      const preferredLanguages = navigator.languages;
      let chosenLanguage = null;

      for (let i = 0; i < preferredLanguages.length; i++) {
        const lang = preferredLanguages[i];
        if (this.$i18n.availableLocales.includes(lang)) {
          chosenLanguage = lang;
          break;
        }
        const lang2 = lang.split("-")[0];
        if (this.$i18n.availableLocales.includes(lang2)) {
          chosenLanguage = lang2;
          break;
        }
      }

      if (chosenLanguage !== null) {
        this.$i18n.locale = chosenLanguage;
        localStorage.language = chosenLanguage;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>