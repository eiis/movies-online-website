<script setup lang="ts">
const emit = defineEmits<{
  (event: 'pageClick', page: number): void
}>()

const currentPage = ref(1)
const totalPages = 500
const visiblePages = computed(() => {
  const pages = []
  if (currentPage.value > 1)
    pages.push(currentPage.value - 1)

  pages.push(currentPage.value)
  if (currentPage.value < totalPages)
    pages.push(currentPage.value + 1)

  return pages
})

function emitChange(page: number) {
  emit('pageClick', page)
}

function pageClick(page: number) {
  currentPage.value = page
  emitChange(page)
}

function prevClick() {
  if (currentPage.value !== 1) {
    currentPage.value--
    emitChange(currentPage.value)
  }
}

function nextClick() {
  if (currentPage.value !== 500) {
    currentPage.value++
    emitChange(currentPage.value)
  }
}
</script>

<template>
  <ol class="flex justify-center gap-1 text-xs font-medium">
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
        @click.prevent="pageClick(page)"
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
  </ol>
</template>
