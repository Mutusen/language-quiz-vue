<template>
  <teleport to="body">
    <transition name="slide">
      <div v-if="show" class="notification" :class="'is-' + type">
        <button class="delete" @click="close"></button>
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    type: {
      type: String,
      required: false,
      default: "info",
    },
    show: {
      type: Boolean,
      required: true,
    },
    timeout: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  watch: {
    show(newVal) {
      if (newVal && this.timeout > 0) {
        setTimeout(() => this.close(), this.timeout * 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .3s;
}
</style>