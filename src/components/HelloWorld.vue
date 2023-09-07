<script setup lang="ts">
import MovieType from './MovieType.vue'
import { API_KEY } from '@/utils/config'
import type { List } from '@/types/list'
import fetchService from '@/utils/server'

const currentPage = ref(1)

const DISCOVER_API_URL = computed<string>(() => {
  return `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN&page=${currentPage.value}`
})

const GENRES_API_URL = `${import.meta.env.VITE_API_URL}/3/genre/movie/list?api_key=${API_KEY}&language=zh-CN`

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
const initialLoad = ref(true)
const showSidebar = ref(false)

onMounted(async () => {
  getMovieList()
  const { data: { genres } } = await fetchService.get<MyResponseType<Genre>>(GENRES_API_URL)
})

function mouseenter() {
  sideHover.value = true
}
function mouseleave() {
  sideHover.value = false
}

async function getMovieList() {
  try {
    const response = await fetchService.get<MyResponseType<List>>(DISCOVER_API_URL.value)
    if (response.status === 200) {
      list.value = response.data.results as List[]
      initialLoad.value = false
    }
  }
  catch (error) {
    console.log('error', error)
  }
}

async function handlePageClick(page: number) {
  list.value = []
  currentPage.value = page
  getMovieList()
}

function menuClick(event: any) {
  event.stopPropagation()

  const sideBarElement = document.querySelector('#sideBar')
  sideBarElement?.classList.remove('max-[480px]:hidden')
  sideBarElement?.classList.add('block')
  sideHover.value = true
}

function overClick() {
  const sideBarElement = document.querySelector('#sideBar')
  sideBarElement?.classList.add('max-[480px]:hidden')
  sideBarElement?.classList.remove('block')
  sideHover.value = false
}
</script>

<template>
  <div class="flex justify-center flex-row w-full h-full dark:bg-black bg-[#dee2e6]" @click="sideHover && overClick()">
    <div
      id="sideBar"
      class="relative w-20 z-[1000] max-[480px]:hidden visible"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <SideBar />
    </div>
    <div :class="{ 'h-screen': list.length === 0 }" class="w-full dark:bg-black bg-[#dee2e6] flex flex-col px-4 relative">
      <div :class="{ 'scale-95 opacity-30': sideHover }" class="flex items-center justify-between transition-all ease-in-out duration-300 font-['Poppins'] text-4xl font-bold py-4 sticky top-0 z-20">
        <div>
          <p>Popular Movies</p>
        </div>
        <div class="max-[480px]:block hidden dark:text-white text-black" @click="menuClick">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>
      </div>
      <LoadingIcon v-if="list.length === 0" class="flex-grow" />
      <MovieList v-else :list="list" class="transition-all ease-in-out duration-300" :class="{ 'scale-95 opacity-30 ': sideHover }" @handlePageClick="handlePageClick" />
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
