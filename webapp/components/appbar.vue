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
      <nuxt-link-locale
        :to="{ name: 'index' }"
        class="d-flex align-center ga-2 text-decoration-none"
      >
        <img src="/logo.png" style="width: 42px" />
        <div class="font-weight-bold text-h6 text-dark">weConvert</div>
      </nuxt-link-locale>
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
