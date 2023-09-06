interface FetchResult<T> {
  data: T
  status: number
  statusText: string
  // ... other
}
export class FetchService {
  private requestInterceptors: Array<(url: string, options: RequestInit) => void> = []
  private responseInterceptors: Array<(response: Response) => void> = []

  async get<T>(url: string): Promise<FetchResult<T>> {
    return this._request('GET', url)
  }

  async post<T>(url: string, body: any): Promise<FetchResult<T>> {
    return this._request('POST', url, body)
  }

  async put<T>(url: string, body: any): Promise<FetchResult<T>> {
    return this._request('PUT', url, body)
  }

  async delete<T>(url: string): Promise<FetchResult<T>> {
    return this._request('DELETE', url)
  }

  addRequestInterceptor(interceptor: (url: string, options: RequestInit) => void) {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: (response: Response) => void) {
    this.responseInterceptors.push(interceptor)
  }

  private async _request<T>(method: string, url: string, body?: any): Promise<FetchResult<T> > {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (body)
      options.body = JSON.stringify(body)

    this.runRequestInterceptors(url, options)
    const response = await fetch(url, options)
    this.runResponseInterceptors(response)
    if (!response.ok)
      throw new Error(`${response.statusText}-${response.status}`)

    const data: T = await response.json()
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    }
  }

  // 请求拦截
  private runRequestInterceptors(url: string, options: RequestInit) {
    this.requestInterceptors.forEach(interceptor => interceptor(url, options))
  }

  // 响应拦截
  private runResponseInterceptors(response: Response) {
    this.responseInterceptors.forEach(interceptor => interceptor(response))
  }
}
