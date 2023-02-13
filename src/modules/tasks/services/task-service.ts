import { service } from '@/modules/core'
import { Task } from '@prisma/client'

class TaskService {
  async getAll () {
    const response = await service.request<{ data: Task[]; error?: string; message?: string } | null>({
      url: '/api/task'
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
      url: '/api/task/create',
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

  async toggle ({ id }: { id: string }) {
    const response = await service.request<{ message: string; error?: string }>({
      url: '/api/task/:id/toggle'.replace(':id', id),
      method: 'put'
    })

    switch (response.code) {
      case 200:
        return response.body?.message
      case 400:
        throw new Error(response.body?.error)
      case 401:
        throw new Error(response.body?.error)
      case 422:
        throw new Error(response.body?.error)
    }
  }

  async delete ({ id }: { id: string }) {
    const response = await service.request<{ message: string; error?: string }>({
      url: '/api/task/:id/delete'.replace(':id', id),
      method: 'delete'
    })

    switch (response.code) {
      case 200:
        return response.body?.message
      case 400:
        throw new Error(response.body?.error)
      case 401:
        throw new Error(response.body?.error)
      case 422:
        throw new Error(response.body?.error)
    }
  }

  async getById ({ id }: { id: string }) {
    const response = await service.request<{ data: Task; error?: string }>({
      url: '/api/task/:id/get'.replace(':id', id)
    })

    switch (response.code) {
      case 200:
        return response.body?.data
      case 400:
        throw new Error(response.body?.error)
      case 401:
        throw new Error(response.body?.error)
      case 422:
        throw new Error(response.body?.error)
    }
  }

  async edit ({ id, title }: { id: string; title: string }) {
    const response = await service.request<{ message: string; error?: string }>({
      url: '/api/task/:id/edit'.replace(':id', id),
      body: { title },
      method: 'put'
    })

    switch (response.code) {
      case 200:
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
