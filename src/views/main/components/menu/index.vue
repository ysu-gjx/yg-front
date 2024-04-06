<template>
  <div class="py-2 max-h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1 dark:text-zinc-200">
      所有分类
    </h2>
    <ul class="overflow-y-auto">
      <li
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const emit = defineEmits(['onItemClick'])

const onItemClick = (item) => {
  emit('onItemClick', item)
}
</script>

<style lang="scss" scoped></style>
