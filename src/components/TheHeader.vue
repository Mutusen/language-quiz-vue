<template>
  <header class="container">
    <div class="columns is-mobile">
      <div class="column is-three-fifths">
        <h1><router-link :to="{ name: 'home' }">{{ $t('languagequiz') }}</router-link></h1>
      </div>
      <div class="column has-text-right">
        <language-menu></language-menu>
      </div>
    </div>
  </header>
</template>

<script>
import LanguageMenu from './LanguageMenu.vue'

export default {
  components: { LanguageMenu },
}
</script>

<style scoped lang="scss">
header {
  margin-top: .2rem;
  margin-bottom: 1.6rem;
}

h1 {
  font-size: 2.6rem;
}
</style>
