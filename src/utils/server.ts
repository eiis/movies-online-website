interface ApiResponse<T> {
  status: string
  data: T
}

export default async function fetchApi<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, config)
    if (!response.ok)
      throw new Error(`Fetch Error: ${response.statusText}`)

    const data = await response.json()
    console.log('data', data)
    return {
      status: 'success',
      data,
    }
  }
  catch (error) {
    return {
      status: 'error',
      data: error as unknown as T,
    }
  }
}
