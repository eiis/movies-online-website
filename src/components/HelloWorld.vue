<script setup lang="ts">
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

function menuClick(event: MouseEvent) {
  // event.stopPropagation()
  // const sideBarElement = document.querySelector('#sideBar')
  // sideBarElement?.classList.remove('max-[480px]:hidden')
  // sideBarElement?.classList.add('block')
  // sideHover.value = true
}

function overClick() {
  // const sideBarElement = document.querySelector('#sideBar')
  // sideBarElement?.classList.add('max-[480px]:hidden')
  // sideBarElement?.classList.remove('block')
  // sideHover.value = false
}
</script>

<template>
  <div class="w-full h-full relative flex justify-center flex-row dark:bg-black bg-blue-50" @click="sideHover && overClick()">
    <div
      id="sideBar"
      class="w-20 relative z-[1000] animate-sideAn max-[480px]:hidden visible"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <SideBar />
    </div>
    <div :class="{ 'h-screen': list.length === 0 }" class="w-[95vw] dark:bg-black bg-blue-50 flex flex-col px-4 relative">
      <div :class="{ 'scale-95 opacity-30': sideHover }" class="bg-blue-50 dark:bg-black flex items-center justify-between transition-all ease-in-out duration-300 font-['Poppins'] text-4xl font-bold py-4 sticky top-0 z-20">
        <div>
          <p>Popular Movies</p>
        </div>
        <div class="max-[480px]:block hidden dark:text-white text-black" @click="menuClick">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      </div>
      <LoadingIcon v-if="list.length === 0" class="flex-grow" />
      <MovieList v-else :list="list" class="transition-all ease-in-out duration-300" :class="{ 'scale-y-[.99] scale-x-[.95] opacity-30 fixed left-0 top-0': sideHover }" @handlePageClick="handlePageClick" />
    </div>
  </div>
</template>

<style scoped>
</style>
