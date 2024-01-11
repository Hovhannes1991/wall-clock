<template>
  <h1 v-if="error">{{ error.message }}</h1>
  <template v-else>
    <WallClock
      v-for="country in selectedCountries"
      :time-offset="country.offset"
      :key="country.id"
    />
  </template>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import WallClock from "./WallClock.vue";

import { useCountriesStore } from "@/store/countries";
const countries_store = useCountriesStore();
const { error, selectedCountries } = storeToRefs(countries_store);
</script>
