<script lang="ts" setup>
const i18n = useI18n();
</script>

<template>
  <v-menu offset="6px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        prepend-icon="mdi-translate"
        rounded="lg"
        variant="tonal"
        color="primary"
      >
        <div style="text-transform: none">
          {{ $i18n.localeProperties.name }}
        </div>
      </v-btn>
    </template>
    <v-list
      :items="$i18n.locales || []"
      item-title="name"
      item-value="code"
      elevation="1"
      class="pa-0"
      @update:selected="(v) => $i18n.setLocale(v[0])"
    >
      <template #item="{ props }">
        <v-list-item v-bind="props" class="border-b"></v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<style lang="scss"></style>
