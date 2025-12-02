<script setup lang="ts">
import { computed } from "vue";
import useTheme from "@/stores/theme";
import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";
import SlideTransition from "./SlideTransition.vue";
import { SECS } from "@/consts";

const themeStore = useTheme();
const nextTheme = computed(() => (themeStore.theme.state === "light" ? "dark" : "light"));
const icon = computed(() => (themeStore.theme.state === "light" ? IconMoon : IconSun));
</script>

<template>
  <label class="theme-toggler">
    <SlideTransition
      :time="SECS"
      :x-per-enter="0"
      :y-per-enter="100"
      :x-per-leave="0"
      :y-per-leave="-100"
    >
      <p class="theme" :key="nextTheme">{{ nextTheme }}</p>
    </SlideTransition>
    <component :is="icon" />
    <input
      class="checkbox"
      type="checkbox"
      :checked="themeStore.theme.state === 'dark'"
      @change="themeStore.toggle_theme"
    />
  </label>
</template>

<style scoped lang="scss">
@use "@/scss/utils";
@use "@/scss/border_radii";
@use "@/scss/text_presets";

.theme-toggler {
  --color: var(--text-color-quinary);
  --duration-half: calc(var(--duration) / 2);

  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  .theme {
    @extend %text-preset-8;

    color: var(--color);
    text-transform: uppercase;
    transition: color var(--duration-half);
  }

  .checkbox {
    @extend %focus-visible;
    @extend %radius-4;

    appearance: none;
    position: absolute;
    inset: 0;
  }

  @media (hover: hover) {
    &:hover {
      --color: var(--text-color-secondary);
    }
  }
}
</style>
