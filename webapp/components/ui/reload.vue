<script lang="ts" setup>
import useRateStore from "~/store/rate";

const dayjs = useDayjs();
const value = ref(0);
const rateStore = useRateStore();

onMounted(decrement);
function decrement() {
  value.value = dayjs().diff(dayjs(rateStore.lastConvertDate), "seconds");
  if (value.value > 59) rateStore.convert();

  setTimeout(decrement, 1000);
}
</script>

<template>
  <div v-if="rateStore.lastConvertDate" class="d-flex align-center ga-2 mb-2">
    <v-progress-circular
      :model-value="(value / 60) * 100"
      width="3"
      color="primary"
    >
      <div style="font-size: 12px" class="text-grey-darken-4">
        {{ value }}
      </div>
    </v-progress-circular>
    <div class="text-body-2">
      {{ $t("lastConvertDate") }}
      {{ $dayjs(rateStore.lastConvertDate).format("DD MMMM YYYY HH:mm") }}
    </div>
  </div>
</template>
