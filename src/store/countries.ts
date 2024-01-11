import { Country, CountriesResponseItem } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const URL = "https://restcountries.com/v3/all";
const getCountries = async (): Promise<CountriesResponseItem[]> => {
  const query_params = "?fields=timezones,name,capital,region,flag,flags";

  const response = await fetch(URL + query_params);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

const getOffset = (value: string) => {
  const [hour, minute] = value.replace("UTC", "").split(":");
  return { hour: parseInt(hour), minute: parseInt(minute) };
};

type CountriesError = null | { message: string };

const storage_selected_countries = localStorage.getItem("selected_countries");
const initial_selected_countries: string[] = storage_selected_countries
  ? JSON.parse(storage_selected_countries)
  : [];

export const useCountriesStore = defineStore("countries", () => {
  const is_loading = ref(false);
  const error = ref<CountriesError>(null);
  const countries = ref<CountriesResponseItem[]>([]);
  const selected_countries = ref(initial_selected_countries);

  const countriesData = computed(() => {
    return countries.value
      .map((country) => {
        return {
          id: country.name.common,
          name: country.name.common,
          offset: getOffset(country.timezones[0]),
          nativeName: country.name.nativeName,
          timezone: country.timezones,
          flag: country.flags[0],
          region: country.region,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  const counriesNames = computed(() => {
    return countriesData.value.map((country) => country.name);
  });

  const selectedCountries = computed(() => {
    const countries: Country[] = [];

    selected_countries.value.forEach((country_name) => {
      const country = countriesData.value.find(
        (c) => c.name === country_name
      ) as Country | undefined;
      if (country) countries.push(country);
    });

    return countries;
  });

  const setSelectedCountries = (countries: string[]) => {
    selected_countries.value = countries;
  };

  const saveSelectedCountries = () => {
    const names = selectedCountries.value.map((country) => country.name);
    localStorage.setItem("selected_countries", JSON.stringify(names));
  };

  const fetchCountries = async () => {
    try {
      is_loading.value = true;
      const data = await getCountries();
      countries.value = data;
    } catch (err: any) {
      error.value = { message: err.message || "Something went wrong!!!" };
    } finally {
      is_loading.value = false;
    }
  };

  return {
    is_loading,
    error,
    countries,
    countriesData,
    counriesNames,
    selectedCountries,
    saveSelectedCountries,
    setSelectedCountries,
    fetchCountries,
  };
});
