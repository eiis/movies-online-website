<script setup lang="ts">
const emit = defineEmits<{
  (event: 'pageClick', page: number): void
}>()

const currentPage = ref(1)
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
    <!-- <footer class="w-full flex items-center justify-center py-2 border-t">
      <p>
        <a
          class="text-[#099268]"
          target="_blank"
          href="https://twitter.com/fu_guiq"
        >@fu_guiq</a>. All Rights Reserved
      </p>
    </footer> -->
    <footer class="w-full flex items-center justify-between py-2 border-t">
      <aside class="flex items-center grid-flow-col">
        <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" /></svg>
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
      <nav class="flex grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
        </a>
        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
      </nav>
    </footer>
  </div>
</template>
