<template>
  <!-- 头部图标：PC端 -->
  <div class="hidden pt-5 h-8 xl:block">
    <img
      class="m-auto"
      v-lazy="'https://res.lgdsunday.club/signlogo.png'"
      alt=""
    />
  </div>
  <!-- 头部图标：移动端 -->
  <div class="h-[111px] xl:hidden">
    <img
      class="dark:hidden"
      v-lazy="'https://res.lgdsunday.club/login-bg.png'"
      alt=""
    />
    <img
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%] rounded"
      v-lazy="'/logo2.png'"
      alt=""
      srcset=""
    />
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
