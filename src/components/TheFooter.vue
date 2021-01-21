<template>
  <footer class="container">
    <i18n-t keypath="websiteBy">
      <template v-slot:link>
        <a href="https://www.apprenti-polyglotte.net/" lang="fr" target="_blank">Apprenti Polyglotte</a>
      </template>
    </i18n-t> ⋅
    <router-link :to="{ name: 'about' }">{{ $t('about.shortTitle') }}</router-link> ⋅
    <router-link :to="{ name: 'contact' }">{{ $t('contact.title') }}</router-link>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
footer {
  margin-top: 2rem;
  text-align: center;
  color: #5B5B5B;
  
  &::before {
    display: block;
    content: ' ';
    border-top: 1px solid #D4D4D4;
    width: 80%;
    max-width: 1000px;
    margin: 0 auto 1rem;
  }
}
</style>
