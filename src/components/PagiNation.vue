<script setup lang="ts">
const emit = defineEmits<{
  (event: 'pageClick', page: number): void
}>()

const currentPage = ref(1)
console.log('currentPage', currentPage.value)
const totalPages = 500
const visiblePages = computed(() => {
  const pages = []
  if (totalPages <= 5) { // 如果总页面数小于或等于5，显示所有页面
    for (let i = 1; i <= totalPages; i++)
      pages.push(i)
  }
  else if (currentPage.value <= 2) { // 当前页面为1或2，显示前5页
    pages.push(1, 2, 3, 4, 5)
  }
  else if (currentPage.value >= totalPages - 1) { // 当前页面为倒数第二页或最后一页，显示最后5页
    pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  }
  else { // 在所有其他情况下，确保currentPage位于中心
    pages.push(currentPage.value - 2, currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2)
  }
  return pages
})

onMounted(() => {
  // 获取URL参数中的currentPage值
  const urlParams = new URLSearchParams(window.location.search)
  const pageFromURL = urlParams.get('currentPage')

  if (pageFromURL)
    currentPage.value = Number(pageFromURL)
})

function emitChange(page: number) {
  emit('pageClick', page)
}

function updateCurrentPage(page: number) {
  // 更新URL参数
  const url = new URL(window.location.href)
  url.searchParams.set('currentPage', String(page))
  window.history.pushState({}, '', url.toString())
}

function pageClick(page: number) {
  currentPage.value = page
  updateCurrentPage(page)
  emitChange(currentPage.value)
}

function prevClick() {
  if (currentPage.value !== 1) {
    currentPage.value--
    updateCurrentPage(currentPage.value)
    emitChange(currentPage.value)
  }
}

function nextClick() {
  if (currentPage.value !== 500) {
    currentPage.value++
    updateCurrentPage(currentPage.value)
    emitChange(currentPage.value)
  }
}

function PageOneClick() {
  currentPage.value = 1
  updateCurrentPage(1)
  emitChange(1)
}

function PageLastClick() {
  currentPage.value = 500
  updateCurrentPage(500)
  emitChange(500)
}
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center">
    <ol class="gap-1 flex m-4 text-xs font-medium">
      <li class="inline-flex h-8 w-12 items-center justify-center rounded bg-white hover:bg-slate-300 text-gray-900 rtl:rotate-180" @click="PageOneClick">
        Page1
      </li>
      <li class="inline-flex h-8 w-8 items-center justify-center rounded bg-white hover:bg-slate-300 text-gray-900 rtl:rotate-180" @click="prevClick">
        <span class="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </li>

      <li
        v-for="page in visiblePages"
        :key="page"
        :class="{ 'text-gray-900 bg-[#099268] rounded-[4px] ': currentPage === page }"
      >
        <div
          class="block h-8 w-8 rounded-[4px]  text-center leading-8"
          :class="{ 'text-gray-900 bg-white hover:bg-slate-300': currentPage !== page }"
          @click="pageClick(page)"
        >
          {{ page }}
        </div>
      </li>

      <li class="inline-flex h-8 w-8 items-center justify-center rounded  bg-white hover:bg-slate-300 text-gray-900 rtl:rotate-180" @click="nextClick">
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </li>

      <li class="inline-flex h-8 w-12 items-center justify-center rounded bg-white hover:bg-slate-300 text-gray-900 rtl:rotate-180" @click="PageLastClick">
        Last
      </li>
    </ol>
    <footer class="w-full flex items-center justify-center py-2 border-t">
      <p>
        Copyright © 2023
        <a
          class="text-[#099268]"
          target="_blank"
          href="https://twitter.com/fu_guiq"
        >@fu_guiq</a>. All Rights Reserved
      </p>
    </footer>
  </div>
</template>
