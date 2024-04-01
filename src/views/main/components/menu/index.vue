<template>
  <div class="py-2 max-h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-auto">
      <li
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// defineProps({
//   categories: {
//     type: Array,
//     required: true
//   }
// })

const emit = defineEmits(['onItemClick'])

const onItemClick = (index) => {
  emit('onItemClick', index)
}
</script>

<style lang="scss" scoped></style>
