<script setup lang="ts">
import { onMounted } from "vue";
import useDb from "./stores/db";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import SearchResults from "./components/SearchResults.vue";

const dbStore = useDb();

onMounted(dbStore.idx.executeImmediate);
</script>

<template>
  <div class="app-root">
    <NavBar />
    <SearchBar />
    <SearchResults />
  </div>
</template>

<style scoped>
.app-root {
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
</style>
