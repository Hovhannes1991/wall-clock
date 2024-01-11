<script setup lang="ts">
import AddClock from "./components/AddClock.vue";
import SelectClockType from "./components/SelectClockType.vue";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import TheLoader from "./components/TheLoader.vue";
import WallClockList from "./components/wall-clock-list/WallClockList.vue";
</script>

<template>
  <TheLoader />

  <TheHeader />
  <SelectClockType />
  <AddClock />
  <WallClockList />
  <TheFooter />
</template>
