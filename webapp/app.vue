<script lang="ts" setup>
import useRateStore from "./store/rate";

const rateStore = useRateStore();

onMounted(() => {
  rateStore.setIsConverting(false);
  rateStore.resetConvertDate();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
