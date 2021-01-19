<template>
  <div class="card" :class="mode">
    <div class="card-content">
      <div class="content">
          <slot></slot>
      </div>
      <footer v-if="$slots.footer">
          <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    props: ['mode'],
}
</script>

<style lang="scss" scoped>
.narrow {
  max-width: 500px;
  margin: auto;
}

.video {
  max-width: 800px;
  margin: auto;
}

footer {
  color: #555;
  font-size: 0.9rem;
}
</style>