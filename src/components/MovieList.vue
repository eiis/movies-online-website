<script setup lang="ts">
import PagiNation from './PagiNation.vue'
import { IMG_PATH } from '@/utils/config'
import type { List } from '@/types/list'

defineProps<{
  list: List[]
}>()

const emit = defineEmits<{
  (event: 'handlePageClick', page: number): void
}>()

function itemClick(item: List) {
  console.log(item)
}
function handlePageClick(page: number) {
  // console.log('Page clicked:', page)
  emit('handlePageClick', page)
}
</script>

<template>
  <div class="w-full mb-4">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-2">
      <div v-for="(item, index) in list" :key="index" class="group relative text-[#099268]" @click="itemClick(item)">
        <img
          class="w-full h-full rounded transition ease-in-out duration-150 group-hover:-z-50 group-hover:opacity-50"
          :src="IMG_PATH + item.poster_path" :alt="item.original_title"
        >
        <div class="overlay-card invisible group-hover:visible group-hover:opacity-80" />
        <div class="w-full h-full invisible group-hover:visible absolute top-0 left-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>
        <div class="w-[90%] bg-[#dee2e6] rounded-[5px] p-4 m-2 flex items-center justify-center group-hover:animate-wiggle  text-center invisible group-hover:visible absolute bottom-0 left-0">
          <p>
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
    <PagiNation @pageClick="handlePageClick" />
  </div>
</template>

<style scoped>
.overlay-card {
  background-color: black;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
