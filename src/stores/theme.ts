import { watch } from "vue";
import { defineStore } from "pinia";
import { useAsyncState, useBroadcastChannel } from "@vueuse/core";
import type { Theme } from "@/types";
import { DEFAULT_THEME } from "@/consts";
import useDb from "./db";

const useTheme = defineStore("theme-store", () => {
  const themeChannel = useBroadcastChannel<Theme, Theme>({ name: "theme-channel" });
  const dbStore = useDb();
  const theme = useAsyncState(dbStore.get_theme, DEFAULT_THEME, { immediate: false });

  function update_root(theme: Theme) {
    const root = document.querySelector(":root");
    const oldTheme = theme === "light" ? "dark" : "light";

    root?.classList.remove(oldTheme);
    root?.classList.add(theme);
  }

  function toggle_theme() {
    const newTheme = theme.state.value === "light" ? "dark" : "light";

    theme.state.value = newTheme;
    update_root(newTheme);
    dbStore.update_theme(newTheme);
    themeChannel.post(newTheme);
  }

  watch(
    dbStore.idx,
    async () => {
      if (dbStore.idx.isReady) await theme.executeImmediate();

      update_root(theme.state.value);
    },
    { immediate: true },
  );

  watch(themeChannel.data, (newTheme) => {
    if (!newTheme) return;

    console.log(`channel data: ${newTheme}`);

    theme.state.value = newTheme;
    update_root(newTheme);
    dbStore.update_theme(newTheme);
  });

  return { theme, toggle_theme };
});

export default useTheme;
