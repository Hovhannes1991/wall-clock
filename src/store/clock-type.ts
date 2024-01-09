import { ClockType } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const selected_clock_type: ClockType =
  (localStorage.getItem("clock_type") as ClockType) || "arabic";

export const useClockTypeStore = defineStore("clock-type", () => {
  const clock_types: ClockType[] = ["arabic", "roman"];

  const clock_type = ref(selected_clock_type);

  const getClockType = computed(() => clock_type);

  const changeClockType = (type: ClockType) => {
    clock_type.value = type;
    localStorage.setItem("clock_type", type);
  };

  return { clock_type, changeClockType, clock_types, getClockType };
});
