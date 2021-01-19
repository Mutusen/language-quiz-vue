<template>
  <header class="container">
    <h1><router-link :to="{ name: 'home' }">Language quiz</router-link></h1>
  </header>
</template>

<script>
export default {
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
