<script lang="ts" setup>
import useRateStore from "~/store/rate";
const rateStore = useRateStore();
</script>

<template>
  <v-container style="max-width: 552px" class="my-10">
    <ui-reload />

    <ui-input
      v-for="(input, i) in rateStore.inputs"
      :key="`${input.currency}-${i}`"
      :index="i"
    />

    <v-btn
      @click="() => rateStore.addInput()"
      class="mt-2"
      color="primary"
      variant="tonal"
      flat
    >
      <v-icon icon="mdi-plus" />
      <div style="font-size: 12px; margin-left: 10px; text-transform: none">
        {{ $t("addCurrency") }}
      </div>
    </v-btn>
  </v-container>
</template>
