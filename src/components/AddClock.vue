<template>
  <div class="add-clock">
    <div v-if="error" class="add-clock__error">{{ error?.message }}</div>
    <SelectDropdown
      v-else
      :dropdown-items="countriesData"
      :selected-items="selectedCountries"
      :show-icon="true"
      :error-object="error"
      :is-loading="is_loading"
      icon-key="flag"
      @deselect-item="updateSelectedItems"
      @select-item="updateSelectedItems"
    />
  </div>
</template>

<script setup lang="ts">
import { Country } from "@/types/types";
import SelectDropdown from "@/utils/SelectDropdown.vue";

import { storeToRefs } from "pinia";
import { useCountriesStore } from "@/store/countries";
const countries_store = useCountriesStore();

const { countriesData, selectedCountries, is_loading, error } =
  storeToRefs(countries_store);
const { fetchCountries, setSelectedCountries, saveSelectedCountries } =
  countries_store;

const updateSelectedItems = (countries: Country[]) => {
  const country_names = countries.map((country) => country.name);
  setSelectedCountries(country_names);
};

fetchCountries();

window.addEventListener("beforeunload", saveSelectedCountries);
</script>

<style lang="scss" scoped>
.add-clock {
  position: fixed;
  z-index: 1000;
}
</style>
