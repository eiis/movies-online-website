<script setup lang="ts">
import { ref } from 'vue'
import fetchApi from '@/utils/server'
import { API_KEY, IMG_PATH } from '@/utils/config'

import type { List } from '@/types/list'

console.log('API_KEY', API_KEY)

const list = ref<List[]>([])

const DISCOVER_API_URL = `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN`

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
}

interface MyResponseType {
  results: List[] // 使用适当的类型
}

fetchApi<MyResponseType>(`${DISCOVER_API_URL}`, options)
  .then((response) => {
    if (response.status === 'success') {
      console.log('Data:', response.data.results)
      list.value = response.data.results
    }
    else {
      console.log('Error:', response.data)
    }
  })
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
    <div v-for="(item, index) in list" :key="index">
      <img class="w-full h-full" :src="IMG_PATH + item.poster_path" :alt="item.original_title">
    </div>
  </div>
</template>

<style scoped>
</style>
