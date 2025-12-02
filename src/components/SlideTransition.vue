<script setup lang="ts">
const props = defineProps<{
  time: number;
  xPerEnter: number;
  yPerEnter: number;
  xPerLeave: number;
  yPerLeave: number;
}>();
</script>

<template>
  <div
    class="slide-container"
    :style="{
      '--transition-duration': `${props.time}s`,
      '--x-per-enter': `${props.xPerEnter}%`,
      '--y-per-enter': `${props.yPerEnter}%`,
      '--x-per-leave': `${props.xPerLeave}%`,
      '--y-per-leave': `${props.yPerLeave}%`,
    }"
  >
    <Transition name="slide" mode="out-in">
      <slot />
    </Transition>
  </div>
</template>

<style lang="scss">
.slide-container {
  .slide-enter-active,
  .slide-leave-active {
    transition:
      transform var(--transition-duration),
      opacity var(--transition-duration) !important;
  }

  .slide-enter-from {
    transform: translate(var(--x-per-enter), var(--y-per-enter));
    opacity: 0;
  }

  .slide-leave-to {
    transform: translate(var(--x-per-leave), var(--y-per-leave));
    opacity: 0;
  }
}
</style>
