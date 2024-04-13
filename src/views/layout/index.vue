<template>
  <div class="h-screen">
    <HeaderVue class="h-header" />
    <!-- <div class="h-main"> -->
    <MainVue class="h-main" />
    <!-- </div> -->
    <FloatingVue />
  </div>
</template>
<script setup>
import HeaderVue from './components/header/index.vue'
import FloatingVue from './components/floating/index.vue'
import MainVue from './components/main.vue'
</script>
<style lang="scss" scoped></style>
