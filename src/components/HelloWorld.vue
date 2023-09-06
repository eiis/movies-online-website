<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent, ref } from 'vue'
import LoadingIcon from './LoadingIcon.vue'
import fetchApi from '@/utils/server'
import { API_KEY } from '@/utils/config'
import type { List } from '@/types/list'

const DISCOVER_API_URL = `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN&page=2`

const modules = import.meta.glob('@/components/MovieList.vue')

interface MyResponseType {
  results: List[]
}

const list = ref<List[]>([])

const MovieList = defineAsyncComponent({
  loader: () => new Promise<Component>(async (resolve) => {
    const response = await fetchApi<MyResponseType>(`${DISCOVER_API_URL}`)

    list.value = response.data.results
    console.log('list.value', list.value)

    const component = await modules['/src/components/MovieList.vue']() as Promise<{ default: Component }>

    resolve(component)
  }),
  loadingComponent: LoadingIcon,
})
defineExpose({
  list,
})
</script>

<template>
  <div class="flex justify-center flex-row w-full">
    <div>
      <SideBar />
    </div>
    <div class="bg-[#dee2e6] flex flex-col justify-start px-4 relative">
      <MovieList :list="list" />
    </div>
  </div>
</template>

<style scoped>
</style>
