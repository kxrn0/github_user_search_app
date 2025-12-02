<script setup lang="ts">
import { onMounted } from "vue";
import { useAsyncState } from "@vueuse/core";
import useDb from "./stores/db";
import get_user from "./utils/get_user";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import ResultsContainer from "./components/ResultsContainer.vue";

const dbStore = useDb();

const userState = useAsyncState(get_user, null, { immediate: false });

onMounted(dbStore.idx.executeImmediate);

onMounted(() => userState.executeImmediate("octocat"));
</script>

<template>
  <div class="app-root">
    <NavBar />
    <SearchBar :show-error="!!userState.error.value" @search="userState.executeImmediate" />
    <ResultsContainer :user-state />
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/breakpoints";

.app-root {
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: breakpoints.$tablet) {
    width: 100%;
  }
}
</style>
