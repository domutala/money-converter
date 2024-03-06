<script lang="ts" setup>
const theme = useTheme();
const themeMode = ref<"dark" | "light" | null>(null);

function nativeThemeMode(): "dark" | "light" {
  let nativeThemeMode: "dark" | "light" = "dark";

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    nativeThemeMode = "dark";
  } else {
    nativeThemeMode = "light";
  }

  return nativeThemeMode;
}

function toggle() {
  let themeMode = sessionStorage.getItem("theme-mode");
  if (themeMode === null) {
    themeMode = nativeThemeMode() === "dark" ? "light" : "dark";
  } else if (themeMode === "light") {
    themeMode = "dark";
  } else {
    themeMode = null;
  }

  if (themeMode) sessionStorage.setItem("theme-mode", themeMode);
  else sessionStorage.removeItem("theme-mode");

  setThemeMode();
}

onMounted(setThemeMode);
function setThemeMode() {
  themeMode.value = sessionStorage.getItem("theme-mode") as any;
  let _themeMode = themeMode.value;

  if (!_themeMode) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      _themeMode = "dark";
    } else {
      _themeMode = "light";
    }
  }

  theme.global.name.value = _themeMode;
}
</script>

<template>
  <v-btn
    @click="toggle"
    class="mr-2"
    rounded="xl"
    color="dark"
    size="small"
    :icon="
      themeMode === 'light'
        ? 'mdi-white-balance-sunny'
        : themeMode === 'dark'
        ? 'mdi-moon-waning-crescent'
        : 'mdi-laptop'
    "
  >
  </v-btn>
</template>
