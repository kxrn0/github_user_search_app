<template>
  <div class="loading-screen"></div>
</template>

<style scoped lang="scss">
@use "@/scss/utils";
@use "@/scss/border_radii";
@use "@/scss/breakpoints";

.loading-screen {
  @extend %shadow-primary;
  @extend %radius-16;

  --animation-duration: calc(var(--duration) * 5);

  background: var(--ui-color-primary);
  width: 45.625rem;
  aspect-ratio: 1.825;
  position: relative;

  &::before,
  &::after {
    @extend %radius-full;

    content: "";
    background: var(--color-blue-500);
    width: 10rem;
    height: 10rem;
    position: absolute;
    top: 50%;
    left: 50%;
    animation: var(--animation-duration) infinite expand ease-in-out;
  }

  &::after {
    opacity: 0;
    animation-delay: calc(var(--animation-duration) / 2);
  }

  @media (max-width: breakpoints.$tablet) {
    width: 100%;
    aspect-ratio: 1;
  }
}
</style>
