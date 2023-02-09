import { service } from '@/modules/core'

class TaskService {
  async getAll () {
    const response = await service.request<{ data: TaskResponse[]; error?: string; message?: string } | null>({
      url: '/task'
    })

    switch (response.code) {
      case 200:
        return response.body
      case 400:
        throw new Error(response.body?.error)
      case 401:
        throw new Error(response.body?.error)
    }
  }

  async create ({ title }: { title: string }) {
    const response = await service.request<{ message: string; error?: string }>({
      url: '/task/create',
      body: {
        title
      },
      method: 'post'
    })

    switch (response.code) {
      case 201:
        return response.body?.message
      case 400:
        throw new Error(response.body?.error)
      case 401:
        throw new Error(response.body?.error)
      case 422:
        throw new Error(response.body?.error)
    }
  }
}

export const taskService = new TaskService()
