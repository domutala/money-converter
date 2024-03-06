<script lang="ts" setup>
import type { VTextField } from "vuetify/components";
import useRateStore from "~/store/rate";

const props = defineProps({ index: { type: Number, required: true } });
const { tm } = useI18n();

const input = ref<VTextField>();
const rateStore = useRateStore();
const isFocused = ref(false);
const textFilter = ref("");

onMounted(() => {
  if (
    rateStore.inputs[props.index].main &&
    rateStore.inputs[props.index].value
  ) {
    onValueChange(rateStore.inputs[props.index].value!, { withoutFocus: true });
  }
});

const _rateFilters = computed(() => {
  const curencyLocales = tm("currency") as { [x: string]: string };

  let availables = JSON.parse(JSON.stringify(rateStore.availables)) as string[];

  const availableRanks = availables.map((x) => ({
    currency: x,
    rank: rateStore.ranking[x] || 0,
  }));

  availableRanks.sort((a, b) => {
    const rankA = a.rank;
    const rankB = b.rank;
    return rankB - rankA;
  });

  availables = availableRanks.map((x) => x.currency);

  return availables.filter((rate: string) => {
    const inRate = rate.toLowerCase().includes(textFilter.value.toLowerCase());
    if (inRate) return true;

    const locale = curencyLocales[rate];
    if (!locale) return false;

    return locale.toLowerCase().includes(textFilter.value.toLowerCase());
  });
});

function onCurrencyChange(value: string | null) {
  if (!value) return;

  const inputs = JSON.parse(JSON.stringify(rateStore.inputs));
  inputs[props.index].currency = value;

  input.value?.focus();

  rateStore.incrementRanking(value);
  rateStore.setInputs(inputs);
  rateStore.convert();
}

function onValueChange(
  value: string,
  options: { withoutFocus?: boolean } = {}
) {
  const result = formatCurrency(value);
  const inputs = JSON.parse(JSON.stringify(rateStore.inputs));
  inputs[props.index].value = result;

  if (isFocused.value || options.withoutFocus) {
    inputs[props.index].main = true;
    for (let i = 0; i < inputs.length; i++) {
      if (i !== props.index) inputs[i].main = false;
    }
  }

  rateStore.setInputs(inputs);
  if (isFocused.value || options.withoutFocus) rateStore.convert();
}
</script>

<template>
  <div class="ui-input border rounded-lg">
    <v-select
      hide-details
      hide-spin-buttons
      flat
      :variant="rateStore.inputs[index].currency ? 'solo-filled' : 'solo'"
      bg-color="transparent"
      rounded="lg"
      :style="{ width: rateStore.inputs[index].currency ? '140px' : '100%' }"
      :menu-props="{ class: 'ui-input--select-content border', offset: '5px' }"
      :items="_rateFilters"
      placeholder="Selectionnez une monaie"
      @update:model-value="onCurrencyChange"
      :model-value="rateStore.inputs[index].currency"
    >
      <template #no-data>
        <div
          class="py-16 text-center"
          :style="{
            width: rateStore.inputs[index].currency ? '310px' : '100%',
          }"
        >
          {{ $t("noCurrencyFound") }}
        </div>
      </template>
      <template #chip="{ item }">
        <svg-icon width="24" height="24" :name="`${item.value}`" class="mr-3" />
        {{ item.value }}
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :style="{
            width: rateStore.inputs[index].currency ? '310px' : '100%',
          }"
        >
          <template #prepend>
            <svg-icon
              width="24"
              height="24"
              :name="`${item.value}`"
              class="mr-3"
            />
          </template>

          <template #title>
            {{ item.value }} — {{ $t(`currency.${item.value}`) }}
          </template>
        </v-list-item>
      </template>

      <template #prepend-item>
        <div
          class="pa-2 bg-background border-b"
          style="position: sticky; top: 0; z-index: 10"
        >
          <v-text-field
            variant="outlined"
            placeholder="Rechercher"
            v-model="textFilter"
            hide-details
          >
            <template #prepend-inner>
              <i class="fi fi-rr-search mr-2" style="font-size: 18px"></i>
            </template>
          </v-text-field>
        </div>
      </template>
    </v-select>

    <v-text-field
      v-if="rateStore.inputs[index].currency"
      variant="solo"
      placeholder="0.00"
      inputmode="decimal"
      style="width: 100%"
      :model-value="rateStore.inputs[index].value"
      flat
      hide-details
      @update:model-value="onValueChange"
      v-model:focused="isFocused"
      ref="input"
      bg-color="transparent"
    ></v-text-field>

    <div class="border-s" style="height: 56px; --v-border-opacity: 0.05">
      <div
        style="width: 30px; font-size: 14px"
        class="d-flex align-center justify-center h-100"
      >
        <div
          v-if="rateStore.inputs[index].main"
          class="border-s w-100 h-100 d-flex align-center justify-center"
        >
          <v-progress-circular
            v-if="rateStore.isConverting"
            width="2"
            color="primary"
            indeterminate
            style="width: 18px"
          />
          <v-icon v-else icon="mdi-calculator" />
        </div>
        <div
          v-else
          class="border-s w-100 h-100 d-flex align-center justify-center"
          style="cursor: pointer"
          @click="rateStore.removeInput(index)"
        >
          <v-icon icon="mdi-trash-can-outline" color="red" />
        </div>
      </div>
    </div>

    <div
      v-if="
        rateStore.rate &&
        rateStore.inputs[index].currency &&
        rateStore.inputs[index].currency !== rateStore.rate.base
      "
      style="
        position: absolute;
        bottom: 0px;
        right: 47px;
        font-size: 12px;
        opacity: 0.5;
      "
    >
      1 {{ rateStore.rate?.base }} =
      {{ rateStore.rate.rates[rateStore.inputs[index].currency] }}
    </div>
  </div>
</template>

<style lang="scss">
.ui-input {
  border-width: 2px !important;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: rgba(var(--v-theme-background), 1);
  transition: all 0.5s ease;
  position: relative;

  .v-field__append-inner {
    display: none;
  }

  .v-text-field:not(.v-select) input {
    text-align: right;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:focus-within {
    border-color: rgb(var(--v-theme-primary)) !important;
    box-shadow: rgba(var(--v-theme-on-background), 0.1) 0px 0px 16px;
  }

  + .ui-input {
    margin-top: 10px;
  }
  &:not(:hover) {
    .ui-input--remove-btn {
      display: none;
    }
  }
}

.ui-input--select-content {
  .v-list {
    padding: 0 !important;
  }
}
</style>
