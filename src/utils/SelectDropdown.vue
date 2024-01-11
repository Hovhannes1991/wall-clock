<template>
  <div :class="dropdownClassList">
    <IconButton
      v-show="!is_open"
      :image-icon="SearchIcon"
      alt-text="Search icon"
      @on-click="openMenu"
    />
    <div v-show="is_open">
      <div class="selected-items">
        <input
          class="search-input"
          v-model="search_value"
          type="search"
          placeholder="Search"
          ref="search_input_ref"
        />
        <!-- <p class="selected-items-labels">
          {{ selectedItemsLabels.count + " items" }}
        </p> -->
        <IconButton
          :image-icon="DropdownIcon"
          alt-text="Dropdown icon"
          @on-click="toggleIsOpen(false)"
        />
      </div>
      <div class="items-list-wrapper">
        <ul>
          <li
            v-for="item in normalizedDropdownItems"
            @click="toggle(item[uniqueKey])"
            :class="{
              'select-dropdown__item': true,
              'select-dropdown__item-selected':
                !!selectedItemsKeys[item[uniqueKey]],
            }"
            :key="item[uniqueKey]"
            :data-value="item[uniqueKey]"
          >
            <img
              v-if="showIcon"
              :src="item[iconKey]"
              class="icon"
              :alt="item[uniqueKey]"
            />
            <span class="app_text-ellipsis" :title="item[labelKey]">{{
              item[labelKey]
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/search.svg";
import DropdownIcon from "@/assets/icons/dropdown.svg";
import IconButton from "./IconButton.vue";
import { ref, computed, nextTick } from "vue";
import { Props } from "./select-dropdown-types";

const props = defineProps(Props);

const emits = defineEmits(["select-item", "deselect-item"]);

const { showIcon, iconKey, uniqueKey, labelKey, dropdownPosition } = props;

const is_open = ref(false);

const toggleIsOpen = (value: boolean) => {
  is_open.value = value;
};

const openMenu = async () => {
  console.log(search_input_ref.value);

  toggleIsOpen(true);
  await nextTick();
  search_input_ref.value?.focus();
};

const dropdownClassList = computed(() => {
  return `select-dropdown ${dropdownPosition} ${
    is_open.value ? "is-open" : ""
  } ${props.isLoading ? "is-loading" : ""} ${
    props.errorInfo ? "has-error" : ""
  }`;
});

const notSelectedItems = computed(() => {
  return props.dropdownItems.filter(
    (item) => !selectedItemsKeys.value[item[uniqueKey]]
  );
});

const search_input_ref = ref<HTMLInputElement>();
const search_value = ref("");

const normalizedDropdownItems = computed(() => {
  //order selected items in first positions
  let normalized_items = [...props.selectedItems, ...notSelectedItems.value];
  //search
  if (search_value.value) {
    const search = search_value.value.toLowerCase();
    normalized_items = normalized_items.filter((item) => {
      return item.name.toLowerCase().startsWith(search);
    });
  }
  return normalized_items;
});

const selectedItemsKeys = computed(() => {
  const map: { [key: string]: boolean } = {};
  props.selectedItems?.forEach((item) => {
    const key = item[props.uniqueKey];
    return (map[key] = true);
  });
  return map;
});

// const selectedItemsLabels = computed(() => {
//   const selected_items = props.selectedItems;
//   const selected_items_labels = selected_items
//     .map((item) => item[labelKey])
//     .join(", ");
//   return {
//     label: selected_items_labels || "No selected item",
//     count: selected_items.length,
//   };
// });

const toggle = (key: string) => {
  const unique_key = props.uniqueKey;

  let updated_items = [...props.selectedItems];

  if (selectedItemsKeys.value[key]) {
    updated_items = updated_items.filter((item) => item[unique_key] !== key);
    emits("deselect-item", updated_items);
  } else {
    const item = props.dropdownItems.find((item) => item[unique_key] === key);
    //check for TypeScript
    if (item) {
      updated_items.push(item);
    }
    emits("select-item", updated_items);
  }
};
</script>

<style scoped lang="scss">
.select-dropdown {
  z-index: 1000;
  position: fixed;
  overflow-y: auto;

  &.is-loading {
    pointer-events: none;
    opacity: 0.5;
  }

  &.top-right {
    right: 1rem;
    top: 1rem;
  }

  .selected-items,
  ul li.select-dropdown__item {
    height: 5rem;
    display: flex;
    align-items: center;
    color: var(--blue-light);
    font-size: 1.8rem;
    padding: 0 1.5rem;
    border-top: 2px solid var(--blue-light);
  }

  .selected-items {
    justify-content: space-between;

    .search-input {
      height: 4rem;
      width: 100%;
      border: none;
      outline: none;
    }

    .dropdown-icon {
      width: 2.5rem;
      height: 2.5rem;
      transition: transform 0.2s ease-in-out;
    }
  }

  .items-list-wrapper {
    display: none;
    min-height: 4rem;
    max-height: 25rem;
    overflow-y: auto;
  }

  ul {
    li.select-dropdown__item {
      list-style: none;
      cursor: pointer;

      &:last-child {
        border-bottom: 2px solid var(--blue-light);
      }

      &.select-dropdown__item-selected {
        color: white;
        background-color: var(--blue-light);
      }

      .icon {
        margin-right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }

  &.is-open {
    width: 20rem;
    background-color: white;
    box-shadow: 0 0 4px 4px var(--blue-dark);
    .items-list-wrapper {
      display: block;
    }

    .dropdown-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
