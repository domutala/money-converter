<script lang="ts" setup></script>

<template>
  <v-app>
    <v-app-bar
      class="ui-appbar px-10"
      elevation="0"
      style="position: sticky"
      scroll-behavior="elevate"
    >
      <template v-slot:prepend>
        <svg-icon name="logo" width="36" class="text-primary" />
      </template>

      <!-- <v-app-bar-title style="line-height: 1; font-size: 16px">
        Money <br />
        Manager
      </v-app-bar-title> -->

      <template v-slot:append>
        <ui-lang-selecter />
      </template>
    </v-app-bar>

    <nuxt-page />

    <v-footer color="bg-indigo-lighten-1 d-flex flex-column justify-end">
      <div class="mb-5 mt-5">© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.ui-appbar {
  &:not(.v-toolbar--flat) {
    box-shadow: rgba(var(--v-theme-on-background), 0.05) 0px 0px 0px 1px !important;
  }
}
</style>
