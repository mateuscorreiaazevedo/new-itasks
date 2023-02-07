import React from 'react'
import * as Popover from '@radix-ui/react-popover'

export const PopoverUi = ({ children }: {children: React.ReactNode}) => {
  return (
    <Popover.Portal>
      <Popover.Content
        className='w-fit h-fit bg-orange-300 dark:bg-zinc-700 p-4 rounded-xl shadow-md'
      >
        <Popover.Arrow className='fill-orange-300 dark:fill-zinc-700' />
        {children}
      </Popover.Content>
    </Popover.Portal>
  )
}
