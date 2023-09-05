<script setup lang="ts">
import MovieList from './MovieList.vue'

import SideBar from './SideBar.vue'
</script>

<template>
  <div class="flex justify-center flex-row py-4 ">
    <SideBar />
    <div class="flex flex-col justify-start">
      <div class="font-['Poppins'] text-xl font-bold">
        <div class="text-center" />
      </div>
      <MovieList />
    </div>
  </div>
</template>

<style scoped>
</style>
