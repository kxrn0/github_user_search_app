<script setup lang="ts">
import ThemeToggler from "./ThemeToggler.vue";
</script>

<template>
  <nav class="navbar">
    <h1 class="title">devfinder</h1>
    <ThemeToggler />
  </nav>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    @extend %text-preset-0;

    color: var(--text-color-primary);
  }
}
</style>
