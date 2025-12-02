<template>
  <div class="not-found">
    <p class="head">No results found!</p>
    <p class="body">
      We couldn’t find any GitHub users matching your search. Please double-check the username and
      internet connection and try again.
    </p>
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/utils";
@use "@/scss/border_radii";
@use "@/scss/text_presets";
@use "@/scss/breakpoints";

.not-found {
  @extend %shadow-primary;
  @extend %radius-16;

  background: var(--ui-color-primary);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  padding: 3rem;
  width: 45.625rem;

  .head {
    @extend %text-preset-2;

    color: var(--text-color-secondary);
  }

  .body {
    @extend %text-preset-6;

    color: var(--text-color-quaternary);
  }

  @media (max-width: breakpoints.$tablet) {
    padding: 3rem 2rem;
    width: 100%;
  }
}
</style>
