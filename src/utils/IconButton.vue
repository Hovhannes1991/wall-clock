<template>
  <button @click="emits('onClick')" class="icon-button">
    <img :src="imageIcon" :alt="altText" />
  </button>
</template>

<script setup lang="ts">
const { imageIcon, altText } = defineProps(["imageIcon", "altText"]);
const emits = defineEmits(["onClick"]);
</script>

<style lang="scss" scoped>
.icon-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
