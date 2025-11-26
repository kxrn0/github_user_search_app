<script setup lang="ts">
import { onMounted } from "vue";
import useDb from "./stores/db";

const dbStore = useDb();

onMounted(() => dbStore.idx.executeImmediate());
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
