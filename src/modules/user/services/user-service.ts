import { service } from '@/modules/core'

class UserService {
  async deleteUser () {
    const response = await service.request<{message: string, error?: string}>({
      url: '/api/user/delete',
      method: 'delete'
    })

    switch (response.code) {
      case 200: return response.body?.message
      case 400: throw new Error(response.body?.message)
      case 401: throw new Error(response.body?.message)
    }
  }
}

export const userService = new UserService()
