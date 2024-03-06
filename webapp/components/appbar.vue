<script lang="ts" setup>
import ThemeSwitcher from "./theme-switcher.vue";
</script>

<template>
  <v-app-bar
    class="ui-appbar px-10"
    elevation="0"
    style="position: sticky"
    scroll-behavior="elevate"
    color="background"
  >
    <template v-slot:prepend>
      <nuxt-link-locale :to="{ name: 'index' }">
        <svg-icon name="logo" width="36" height="36" class="text-primary" />
      </nuxt-link-locale>
    </template>

    <template v-slot:append>
      <theme-switcher />
      <ui-lang-selecter />
    </template>
  </v-app-bar>
</template>

<style lang="scss">
.ui-appbar {
  &:not(.v-toolbar--flat) {
    box-shadow: rgba(var(--v-theme-on-background), 0.05) 0px 0px 0px 1px !important;
  }
}
</style>
