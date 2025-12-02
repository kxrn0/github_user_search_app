<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize, type UseAsyncStateReturn } from "@vueuse/core";
import { MOBILE_WIDTH, SECS } from "@/consts";
import type { GithubUser } from "@/types";
import SlideTransition from "./SlideTransition.vue";
import NotFound from "./NotFound.vue";
import LoadingScreen from "./LoadingScreen.vue";
import UserInfo from "./UserInfo.vue";

const props = defineProps<{
  userState: UseAsyncStateReturn<GithubUser | null, [userName: string], true>;
}>();
const reactiveWindow = useWindowSize();
const xDirection = computed(() => (reactiveWindow.width.value < MOBILE_WIDTH ? 0 : 100));
const yDirection = computed(() => (xDirection.value === 0 ? 100 : 0));
</script>

<template>
  <SlideTransition
    :time="SECS"
    :x-per-enter="xDirection"
    :y-per-enter="yDirection"
    :x-per-leave="-xDirection"
    :y-per-leave="-yDirection"
  >
    <NotFound v-if="props.userState.error.value" />
    <LoadingScreen v-else-if="props.userState.isLoading.value" />
    <div v-else>
      <LoadingScreen v-if="!props.userState.state.value" />
      <UserInfo v-else :user="props.userState.state.value" />
    </div>
  </SlideTransition>
</template>
