import axios, { AxiosInstance, AxiosResponse } from 'axios'

type HttpRequest = {
  url: string
  body?: any
  headers?: any
  params?: any
  method?: 'get' | 'post' | 'put' | 'delete'
}

type HttpResponse<T> = {
  code: number
  body?: T
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

class Service {
  private api: AxiosInstance

  constructor (private readonly baseURL: string = BASE_URL) {
    this.api = axios.create({
      baseURL
    })
  }

  async request<T = any> (props: HttpRequest): Promise<HttpResponse<T>> {
    const { url, body, headers, method = 'get', params } = props
    let response: AxiosResponse

    try {
      response = await this.api.request({
        url,
        method,
        data: body,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      })
    } catch (error) {
      response = (error as any).response
    }

    return {
      code: response.status,
      body: response.data
    }
  }
}

export const service = new Service()
