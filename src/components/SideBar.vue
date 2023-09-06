<script setup lang="ts">
// import { ref } from 'vue'
import {
  Sidenav,
  initTE,
} from 'tw-elements'

initTE({ Sidenav })
</script>

<template>
  <div>
    <nav class="movie-sidebar-nav">
      <header class="sidebar-web-logo">
        <figure class="logo-container">
          <img src="/src/images/web-logo.png" class="logo-img" alt="">
          <figcaption class="logo-name">
            MOVIEMATRIX
          </figcaption>
        </figure>
      </header>

      <div class="sidebar-buttons">
        <div class="search-input-container">
          <form
            action="#"
            data-type-btn="form-btn"
            class="sidebar-form nav-form-btn"
          >
            <button class="sidebar-search-btn nav-search-btn">
              <i class="bx bx-search-alt" />
            </button>

            <input
              id=""
              type="text"
              class="sidebar-search-input"
              placeholder="Search Movies..."
              name=""
            >
          </form>

          <h3 class="secondary-title">
            Search
          </h3>
        </div>

        <ul class="nav-lists sidebar-lists-btn">
          <li class="nav-list sidebar-expansion-btn">
            <a
              data-page="expand"
              data-type-btn="expand"
              class="nav-btn sidebar-expand-btn"
            >
              <i class="bx bx-chevrons-right" />
            </a>
            <h3 class="secondary-title expand-secondary">
              Expand
            </h3>
          </li>

          <li class="nav-list">
            <a data-page="home" class="nav-btn">
              <i class="bx bx-home" />
              <h3 class="nav-title">Home</h3>
            </a>
            <h3 class="secondary-title">
              Home
            </h3>
          </li>

          <li class="nav-list">
            <a data-page="trending" class="nav-btn">
              <i class="bx bxs-hot" />
              <h3 class="nav-title">Trending</h3>
            </a>
            <h3 class="secondary-title">
              Trending
            </h3>
          </li>

          <li class="nav-list">
            <a data-page="movies-pop" class="nav-btn">
              <i class="bx bx-movie" />
              <h3 class="nav-title">Movies</h3>
            </a>
            <h3 class="secondary-title">
              Movies
            </h3>
          </li>

          <li class="nav-list">
            <a data-page="tvs-pop" class="nav-btn">
              <i class="bx bx-tv" />
              <h3 class="nav-title">TV's</h3>
            </a>
            <h3 class="secondary-title">
              TV Shows
            </h3>
          </li>

          <li class="nav-list">
            <a data-page="bookmarks" class="nav-btn">
              <i class="icon-bm bx bx-book-bookmark" />
              <h3 class="nav-title">Bookmarks</h3>
            </a>
            <h3 class="secondary-title">
              Bookmarks
            </h3>
          </li>
        </ul>
      </div>

      <footer class="sidebar-footer nav-list">
        <a data-page="settings" class="nav-btn">
          <i class="ph-gear settings-icon" />
          <h3 class="nav-title">Settings</h3>
        </a>
        <h3 class="secondary-title">
          Settings
        </h3>
      </footer>
    </nav>
  </div>
</template>

<style scoped>
</style>
