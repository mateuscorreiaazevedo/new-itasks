import { toast } from 'react-toastify'

export const useNotification = () => {
  const setNotification = (message: string, type: 'error'|'success'|'info' = 'error') => {
    switch (type) {
      case 'error':
        toast.error(message, { position: 'bottom-right', theme: 'colored' })
        break
      case 'info':
        toast.info(message, { position: 'bottom-right', theme: 'colored' })
        break
      case 'success':
        toast.success(message, { position: 'bottom-right', theme: 'colored' })
        break
    }
  }

  return {
    setNotification
  }
}
