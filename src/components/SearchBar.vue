<script setup lang="ts">
import { ref } from "vue";
import IconSearch from "./icons/IconSearch.vue";

const props = defineProps<{
  showError: boolean;
}>();
const emits = defineEmits<{
  (e: "search", userName: string): void;
}>();

const userName = ref("");
const isFocused = ref(false);

function search() {
  if (userName.value !== "") emits("search", userName.value);
}
</script>

<template>
  <form @submit.prevent="search">
    <label class="search-bar" :class="{ focused: isFocused }">
      <IconSearch />
      <input
        class="text-input"
        type="text"
        v-model.trim="userName"
        placeholder="Search Github username…"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <p v-if="props.showError" class="error">No results</p>
      <button class="button" @click="search">Search</button>
    </label>
  </form>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";
@use "@/scss/buttons";
@use "@/scss/utils";
@use "@/scss/border_radii";
@use "@/scss/breakpoints";

.search-bar {
  @extend %shadow-primary;
  @extend %radius-16;

  background: var(--ui-color-primary);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 45.625rem;
  padding: 0 0.75rem;

  &.focused {
    @extend %focus-styles;
  }

  .icon-search {
    width: 1.5rem;
    flex-shrink: 0;
  }

  .text-input {
    @extend %text-preset-3;

    background: transparent;
    color: var(--text-color-secondary);
    outline: none;
    border: none;
    height: 4.375rem;
    width: 100%;
    padding: 1.375rem 0;

    &::placeholder {
      color: var(--text-color-tertiary);
      opacity: 0.7;
    }
  }

  .error {
    @extend %text-preset-5;

    color: var(--color-red-500);
    flex-shrink: 0;
    margin-right: 0.25rem;
  }

  .button {
    @extend %button-primary;
  }

  @media (max-width: breakpoints.$tablet) {
    gap: 0.5rem;
    width: 100%;

    .icon-search {
      width: 1.25rem;
    }
  }
}
</style>
