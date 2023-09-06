const KEY: number = import.meta.env.VITE_KEY as number

export const API_KEY: number = KEY
export const API_URL: string = 'https://api.themoviedb.org/3/'

export const IMG_PATH: string = 'https://image.tmdb.org/t/p/w1280'

export const POPULAR_MOVIES_API_URL: string = `${API_URL}movie/popular?api_key=${API_KEY}&language=zh-CN`
export const DISCOVER_API_URL: string = `${API_URL}discover/movie?api_key=${API_KEY}&language=zh-CN`
export const POPULAR_TVS_API_URL: string = `${API_URL}tv/popular?api_key=${API_KEY}&language=zh-CN`
export const TRENDING_API_URL: string = `${API_URL}trending/all/day?api_key=${API_KEY}&language=zh-CN`

export const SEARCH_API_URL: string = `${API_URL}search/multi?api_key=${API_KEY}&language=zh-CN&page=1`

// VARIABLES

export const DEFAULT_PAGE_TYPE: string = 'home'

export const MAX_PAGE: number = 500 // DONT CHANGE NUMBER ABOVE 500
export const FIRST_PAGE: number = 1 // ALWAYS 1

export const MAX_AFTER_PAGES_BUTTONS: number = 3
export const MAX_BEFORE_PAGES_BUTTONS: number = 3

export const EXPAND_CARD_DURATION: number = 400
export const UNEXPAND_CARD_DURATION: number = 600

export const MAX_CAST_CARDS: number = 10
