<template>
  <div class="wall-clock">
    <WallClockHands />
    <div
      v-for="(time_item, index) in time_items"
      class="number"
      :key="time_item"
      :style="timeItemsPositions[index]"
    >
      <span>{{ time_item }}</span>
    </div>

    <div
      v-for="(line, index) in lines_count"
      :class="linesPositionsClasses[index].class_name"
      :style="linesPositionsClasses[index].style"
      :key="line"
    >
      |
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClockTypeStore } from "@/store/clock-type";
const clock_type_store = useClockTypeStore();

import { computed } from "vue";
import { TimeItemsPositions, LinesPositionsClasses } from "@/types/types.ts";
import WallClockHands from "./WallClockHands.vue";

const lines_count = 5 * 12;

const arabic = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const roman = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];

const type = clock_type_store.getClockType;

const time_items = computed(() => {
  return type.value === "arabic" ? arabic : roman;
});

const timeItemsPositions = computed<TimeItemsPositions>(() => {
  return time_items.value.map((_time_item, index) => {
    const item_number = index + 1;
    return { rotate: item_number * 30 + "deg" };
  });
});

const linesPositionsClasses = computed<LinesPositionsClasses>(() => {
  const arr = [] as LinesPositionsClasses;
  for (let index = 1; index < lines_count + 1; index++) {
    const class_name = index % 5 === 0 ? "line big-line" : "line";
    const style = { rotate: index * 6 + "deg" };

    arr.push({ class_name, style });
  }

  return arr;
});
</script>

<style lang="scss" scoped>
.wall-clock {
  position: relative;
  width: calc(var(--clock-size) + 4rem);
  height: calc(var(--clock-size) + 4rem);
  border: 2rem solid var(--blue-dark);
  box-shadow: inset 0 0 2rem 1rem #3b4a5a;
  border-radius: 100%;
  background-color: var(--blue-light);

  .number {
    position: absolute;
    display: flex;
    justify-content: center;
    color: var(--white);
    left: 1rem;
    top: 1rem;
    width: calc(var(--clock-size) - 2rem);
    height: calc(var(--clock-size) - 2rem);
    font-size: 3.2rem;
    @media (max-width: 700px) {
      font-size: 2.5rem;
    }
    @media (max-width: 450px) {
      font-size: 1.8rem;
    }
  }

  .line {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--clock-size);
    height: var(--clock-size);
    display: flex;
    justify-content: center;
    color: var(--white);
    font-size: 0.8rem;
    padding-bottom: 2rem;

    &.big-line {
      font-size: 1.3rem;
      font-weight: 700;
    }
  }
}
</style>
