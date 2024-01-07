<template>
  <div class="wall-clock-hands">
    <div class="hour-container">
      <div class="hour" id="hour" :style="{ transform: hour_pos }">
        <div class="hour-line"></div>
      </div>
    </div>
    <div class="minute-container">
      <div class="minute" id="minute" :style="{ transform: minute_pos }">
        <div class="minute-line"></div>
      </div>
    </div>
    <div class="second-container">
      <div class="second" id="second" :style="{ transform: second_pos }">
        <div class="second-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useClockHandsPositions from "@/composables/useClockHandsPositions";

const hour_pos = ref("");
const minute_pos = ref("");
const second_pos = ref("");
const intervalId = ref<number | null>(null);

const updateHandsPositions = () => {
  const positions = useClockHandsPositions();
  hour_pos.value = positions.hour;
  minute_pos.value = positions.minute;
  second_pos.value = positions.second;
};

updateHandsPositions();

intervalId.value = setInterval(updateHandsPositions, 1000);
</script>

<style lang="scss" scoped>
.wall-clock-hands:before,
.hour-container,
.minute-container,
.second-container {
  position: absolute;
}
.wall-clock-hands {
  width: var(--clock-size);
  height: var(--clock-size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &::before {
    content: "";
    width: 1.5rem;
    height: 1.5rem;
    background: pink;
    border-radius: 50%;
    z-index: 10000;
  }

  .hour-container {
    position: absolute;
    width: calc(var(--clock-size) * 35 / 100);
    height: calc(var(--clock-size) * 35 / 100);

    .hour {
      width: calc(var(--clock-size) * 35 / 100);
      height: calc(var(--clock-size) * 35 / 100);

      .hour-line {
        position: absolute;
        width: 0.8rem;
        height: calc(var(--clock-size) * 20 / 100);
        background-color: #ff105e;
        z-index: 10;
        border-radius: 20px 20px 0 0;
      }
    }
  }

  .minute,
  .minute-container {
    width: calc(var(--clock-size) * 55 / 100);
    height: calc(var(--clock-size) * 55 / 100);

    .minute-line {
      position: absolute;
      width: 4px;
      height: calc(var(--clock-size) * 30 / 100);
      background: #add8e6;
      z-index: 11;
    }
  }

  .second,
  .second-container {
    width: calc(var(--clock-size) * 70 / 100);
    height: calc(var(--clock-size) * 70 / 100);

    .second-line {
      position: absolute;
      width: 2px;
      height: calc(var(--clock-size) * 40 / 100);
      background: #ff9f1c;
      z-index: 12;
    }
  }

  .hour,
  .minute,
  .second {
    display: flex;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
  }
}
</style>
