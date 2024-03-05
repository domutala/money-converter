<script lang="ts" setup>
import Appbar from "~/components/ui/appbar.vue";
</script>

<template>
  <v-app>
    <appbar />

    <slot />

    <v-footer color="bg-indigo-lighten-1 d-flex flex-column justify-end">
      <div class="mb-5 mt-5">© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>
