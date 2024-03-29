<template>
  <div class="h-screen">
    <HeaderVue class="h-header" />
    <MainVue class="h-main" />
    <FloatingVue />
  </div>
</template>
<script setup>
import HeaderVue from './components/header/index.vue'
import FloatingVue from './components/floating.vue'
import MainVue from './components/main.vue'
</script>
<style lang="scss" scoped></style>
