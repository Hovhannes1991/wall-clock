<template>
  <div class="select-clock-type">
    <select
      @change="changeClockType"
      name="select_clock"
      class="clock-type-dropdown"
      :value="clock_type_store.clock_type"
    >
      <option v-for="option in clock_type_store.clock_types" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ClockType } from "@/types/types";
import { useClockTypeStore } from "@/store/clock-type";
const clock_type_store = useClockTypeStore();

const changeClockType = (e: Event) => {
  const e_traget = e.target as HTMLSelectElement & { value: ClockType };
  clock_type_store.changeClockType(e_traget.value);
};
</script>

<style lang="scss" scoped>
.select-clock-type {
  position: fixed;
  top: 1rem;
  left: 1rem;

  select.clock-type-dropdown {
    border: 2px solid #008b8b;
    background: #add8e6;
    color: #fff;
    outline: 0;
    cursor: pointer;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }

    option {
      text-transform: capitalize;
    }
  }
}
</style>
