<script setup lang="ts">
import qs from 'qs'
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
const genresList = ref<Genre[]>([])
const sideHover = ref(false)
const initialLoad = ref(true)
const showSidebar = ref(false)
const open = ref(false)

onMounted(async () => {
  getMovieList()
  getgenresList()
  // const { data: { genres } } = await fetchService.get<MyResponseType<Genre>>(GENRES_API_URL)
})

async function getgenresList() {
  try {
    const response = await fetchService.get<MyResponseType<Genre>>(GENRES_API_URL)
    if (response.status === 200)
      genresList.value = response.data.genres as Genre[]
  }
  catch (error) {
    console.log('error', error)
  }
}
function mouseenter() {
  sideHover.value = true
}
function mouseleave() {
  sideHover.value = false
}

async function getMovieList(query?: any) {
  const params = {
    api_key: API_KEY,
    language: 'zh-CN',
    page: currentPage.value,
    ...query,
  }
  const DISCOVER_API_URL = `${import.meta.env.VITE_API_URL}/3/discover/movie?${qs.stringify(params)}`
  try {
    const response = await fetchService.get<MyResponseType<List>>(DISCOVER_API_URL)
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
  event.stopPropagation()
  showSidebar.value = true
}

function overClick() {
  showSidebar.value = false
}

function genreClick(item: Genre) {
  open.value = false
  list.value = []
  const obj = {
    with_genres: item.id,
  }
  getMovieList(obj)
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
    <div id="movie" :class="{ 'h-screen': list.length === 0, 'opacity-30': showSidebar }" class="w-[95vw] dark:bg-black bg-blue-50 flex flex-col px-4 relative" @click="showSidebar && overClick()">
      <div :class="{ 'scale-95 opacity-30': sideHover }" class="bg-blue-50 dark:bg-black flex items-center justify-between transition-all ease-in-out duration-300 font-['Poppins'] text-4xl font-bold py-4 sticky top-0 z-20">
        <div class="flex items-center justify-center">
          <div>
            <p>Popular Movies</p>
          </div>
          <div class="dropdown mx-2 max-[480px]:hidden visible">
            <label tabindex="0" class="btn m-1 bg-[#099268] hover:bg-[#099268]" @click="() => open = true">Type</label>
            <div v-if="open" tabindex="0" class="w-[40vw] grid grid-cols-3 text-center dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <div v-for="(item, index) in genresList" :key="index" @click="genreClick(item)">
                <div class="hover:text-[#099268] my-2">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="dropdown mx-2 max-[480px]:block hidden">
            <div tabindex="0" class="m-1" @click="() => open = true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div v-if="open" tabindex="0" class="w-[40vw] absolute top-10 right-0 grid grid-cols-3 text-center dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <div v-for="(item, index) in genresList" :key="index" @click="genreClick(item)">
                <div class="hover:text-[#099268] my-2">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="max-[480px]:block hidden dark:text-white text-black" @click="menuClick">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        </div>
      </div>
      <LoadingIcon v-if="list.length === 0" class="flex-grow" />
      <MovieList v-else :list="list" class="transition-all ease-in-out duration-300" :class="{ 'scale-y-[.99] scale-x-[.95] opacity-30 fixed left-0 top-0': sideHover || showSidebar }" @handlePageClick="handlePageClick" />
    </div>
  </div>
</template>

<style scoped>
</style>
