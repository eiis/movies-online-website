import fetchApi from '@/utils/server'
import { API_KEY } from '@/utils/config'

import type { List } from '@/types/list'

const DISCOVER_API_URL = `${import.meta.env.VITE_API_URL}/3/discover/movie?api_key=${API_KEY}&language=zh-CN&page=2`

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//   },
// }

interface MyResponseType {
  results: List[] // 使用适当的类型
}

fetchApi<MyResponseType>(`${DISCOVER_API_URL}`)
// .then((response) => {
//   if (response.status === 'success')
//     console.log('Data:', response.data.results)
//     // list.value = response.data.results
//   else
//     console.log('Error:', response.data)
// })
