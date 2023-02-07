import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const ButtonUi = ({ children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className='w-72 h-10 rounded-lg bg-orange-400 shadow hover:bg-orange-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-all font-semibold text-xl flex items-center justify-center gap-2 dark:text-white'
    >
      {children}
    </button>
  )
}
