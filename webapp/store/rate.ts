import { defineStore } from "pinia";
import type { IRate } from "~/models";
import formatCurrency from "~/utils/formatCurrency";

export const useRateStore = defineStore(
  "rate",
  () => {
    const apiUrl = useRuntimeConfig().public.apiUrl;
    const rate = ref<IRate>();

    const availables = ref<string[]>([]);
    async function setAvailables() {
      const response = await fetch(`${apiUrl}/rate`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      availables.value = Object.keys(data.rates);
    }
    onMounted(setAvailables);

    const inputs = ref<{ currency?: string; value?: string; main?: boolean }[]>(
      [{ main: true }]
    );
    function setInputs(
      value: { currency: string; value?: string; main: boolean }[]
    ) {
      inputs.value = value;
    }
    function addInput() {
      if (
        inputs.value.length < 10 &&
        inputs.value[inputs.value.length - 1].currency
      ) {
        inputs.value = [...inputs.value, {}];
      }
    }
    function removeInput(index: number) {
      if (inputs.value.length > 1) {
        inputs.value.splice(index, 1);
      }
    }

    const ranking = ref<{ [x: string]: number }>({});
    function incrementRanking(currency: string) {
      ranking.value[currency] ||= 0;
      ranking.value[currency]++;
    }

    let index: string = "";
    const lastConvertDate = ref<Date>(new Date());
    const isConverting = ref(false);
    async function convert() {
      isConverting.value = true;

      try {
        lastConvertDate.value = new Date();

        const inIndex = Math.random().toString();
        index = inIndex;

        let from = "";
        let value = "";
        const tos: string[] = [];

        for (const input of inputs.value) {
          if (input.currency) {
            if (input.main) {
              if (input.value) {
                from = input.currency;
                value = input.value
                  .replace(/\s/g, "")
                  .replace(",", ".")
                  .replace(/[^\d.]/g, "");
              }
            } else tos.push(input.currency);
          }
        }

        if (from && tos.length && value) {
          const url = `${apiUrl}?value=${value}&from=${from}&to=${tos.join(
            ";"
          )}`;

          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          const _inputs = JSON.parse(JSON.stringify(inputs.value));
          const data: { rate: IRate; result: { [x: string]: number } } =
            await response.json();

          rate.value = data.rate;

          for (let i = 0; i < _inputs.length; i++) {
            if (_inputs[i].currency) {
              if (_inputs[i].currency !== from) {
                const v = data.result[_inputs[i].currency!];
                _inputs[i].value = formatCurrency(v.toString());
              }
              // else {
              //   _inputs[i].value = formatCurrency(value);
              // }
            }
          }

          if (inIndex === index) {
            inputs.value = _inputs;
          }
        }
      } finally {
        isConverting.value = false;
      }
    }

    return {
      availables,
      setAvailables,

      inputs,
      setInputs,
      addInput,
      removeInput,

      ranking,
      incrementRanking,

      convert,
      lastConvertDate,
      isConverting,

      rate,
    };
  },
  { persist: true }
);

export default useRateStore;
