import { createApp } from 'vue'
import './style.css'
import {
  Carousel,
  initTE,
} from 'tw-elements'
import App from './App.vue'

createApp(App).mount('#app')

initTE({ Carousel })
