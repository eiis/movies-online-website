<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  Modal,
  initTE,
} from 'tw-elements'
import LoadingIcon from './LoadingIcon.vue'
import MovieType from './MovieType.vue'
import { API_KEY } from '@/utils/config'
import type { List } from '@/types/list'
import fetchService from '@/utils/server'

onMounted(() => {
  initTE({ Modal })
})

const DISCOVER_API_URL = `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN&page=1`

const GENRES_API_URL = `${import.meta.env.VITE_API_URL}/3/genre/movie/list?api_key=${API_KEY}&language=zh-CN`

const modules = import.meta.glob('@/components/MovieList.vue')

interface MyResponseType<T> {
  page?: number
  total_pages?: number
  total_results?: number
  results?: T[]
  genres?: T[]
}
interface Genre {
  name: string
  id: number
}

const list = ref<List[]>([])

onMounted(async () => {
  const { data: { genres } } = await fetchService.get<MyResponseType<Genre>>(GENRES_API_URL)
})

const MovieList = defineAsyncComponent({
  loader: () => new Promise<Component>(async (resolve) => {
    const response = await fetchService.get<MyResponseType<List>>(DISCOVER_API_URL)
    list.value = response.data.results as List[]
    const component = await modules['/src/components/MovieList.vue']() as Promise<{ default: Component }>

    // setTimeout(() => {
    resolve(component)
    // }, 90000000)
  }),
  loadingComponent: LoadingIcon,
})
defineExpose({
  list,
})
</script>

<template>
  <div class="flex justify-center flex-row w-full">
    <div class="relative w-20">
      <SideBar />
    </div>
    <div class="w-full bg-[#dee2e6] flex flex-col px-4 relative">
      <div class="flex font-['Poppins'] text-4xl font-bold bg-[#dee2e6] py-4 sticky top-0 z-20">
        <p>Popular Movies</p>
        <button
          type="button"
          class="inline-block font-['Poppins'] rounded bg-[#099268] mx-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#099268] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#099268] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[bg-[#099268]] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-toggle="modal"
          data-te-target="#leftBottomModal"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          电影类型
        </button>
      </div>
      <MovieType />
      <MovieList :list="list" />
    </div>
  </div>
</template>

<style scoped>
</style>
