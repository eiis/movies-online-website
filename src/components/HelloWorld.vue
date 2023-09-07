<script setup lang="ts">
import type { Component } from 'vue'
import LoadingIcon from './LoadingIcon.vue'
import MovieType from './MovieType.vue'
import { API_KEY } from '@/utils/config'
import type { List } from '@/types/list'
import fetchService from '@/utils/server'

const currentPage = ref(1)

const DISCOVER_API_URL = computed<string>(() => {
  return `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN&page=${currentPage.value}`
})

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
const sideHover = ref(false)

onMounted(async () => {
  const { data: { genres } } = await fetchService.get<MyResponseType<Genre>>(GENRES_API_URL)
})

const MovieList = defineAsyncComponent({
  loader: () => new Promise<Component>(async (resolve) => {
    const response = await fetchService.get<MyResponseType<List>>(DISCOVER_API_URL.value)
    list.value = response.data.results as List[]
    console.log('response.data', response.data)
    const component = await modules['/src/components/MovieList.vue']() as Promise<{ default: Component }>

    // setTimeout(() => {
    resolve(component)
    // }, 90000000)
  }),
  loadingComponent: LoadingIcon,
})

function mouseenter() {
  console.log('mouseenter')
  sideHover.value = true
}
function mouseleave() {
  console.log('mouseleave')
  sideHover.value = false
}

async function handlePageClick(page: number) {
  console.log('page', page)
  currentPage.value = page
  const response = await fetchService.get<MyResponseType<List>>(DISCOVER_API_URL.value)
  list.value = response.data.results as List[]
}
</script>

<template>
  <div class="flex justify-center flex-row w-full h-full bg-[#dee2e6]">
    <div
      class="relative w-20 z-[1000]"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <SideBar />
    </div>
    <div class="w-full bg-[#dee2e6] flex flex-col px-4 relative">
      <div :class="{ 'scale-95 opacity-30 ': sideHover }" class="flex transition-all ease-in-out duration-300 font-['Poppins'] text-4xl font-bold bg-[#dee2e6] py-4 sticky top-0 z-20">
        <p>Popular Movies</p>
      </div>
      <MovieList :list="list" class="transition-all ease-in-out duration-300" :class="{ 'scale-95 opacity-30 ': sideHover }" @handlePageClick="handlePageClick" />
    </div>
  </div>
  <!-- <MovieType /> -->
  <!-- <button
          type="button"
          class="inline-block font-['Poppins'] rounded bg-[#099268] mx-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#099268] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#099268] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[bg-[#099268]] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-toggle="modal"
          data-te-target="#leftBottomModal"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          电影类型
        </button> -->
</template>

<style scoped>
</style>
