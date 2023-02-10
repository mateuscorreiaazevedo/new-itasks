import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className='h-screen w-screen bg-black/60 fixed inset-0 flex items-center justify-center'
      >
        <Dialog.Content className="w-fit h-fit bg-orange-300 dark:bg-zinc-800 p-4 rounded-xl shadow-md">
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
