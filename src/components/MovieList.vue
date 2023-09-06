<script setup lang="ts">
import { IMG_PATH } from '@/utils/config'
import type { List } from '@/types/list'

defineProps<{
  list: List[]
}>()
</script>

<template>
  <div class="font-['Poppins'] bg-[#dee2e6] text-4xl font-bold sticky top-0 z-20 my-2">
    Popular Movies
  </div>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-2">
    <div v-for="(item, index) in list" :key="index" class="group relative">
      <img
        class="w-full h-full transition ease-in-out duration-150 z-10"
        :src="IMG_PATH + item.poster_path" :alt="item.original_title"
      >
    </div>
  </div>
</template>

<style scoped>
</style>
