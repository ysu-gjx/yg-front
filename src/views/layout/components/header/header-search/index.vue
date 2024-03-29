<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown> dropdown </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
<style lang="scss" scoped></style>
