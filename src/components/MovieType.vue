<script setup lang="ts">
</script>

<template>
  <div class="">
    <div
      id="leftBottomModal"
      data-te-modal-init
      class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      tabindex="-1"
      aria-labelledby="leftBottomModalLabel"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        class="pointer-events-none absolute top-7 left-[25%] h-auto w-[50%] translate-y-[-100%] opacity-0 transition-all duration-300 ease-in-out"
      >
        <div
          class="relative flex w-full flex-col rounded-md border-none bg-white text-current shadow-lg outline-none dark:bg-neutral-600"
        >
          <div
            class="flex flex-shrink-0 items-center justify-between rounded-full border-neutral-200 p-4 dark:border-neutral-500"
          >
            <h5
              id="leftBottomModalLabel"
              class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
            >
              Subscribe
            </h5>
            <button
              type="button"
              class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
