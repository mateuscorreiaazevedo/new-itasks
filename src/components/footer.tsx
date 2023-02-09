import Link from 'next/link'

export function Footer () {
  return (
    <footer className="w-full h-full my-4">
      <div className="container mx-auto flex items-center justify-between shadow-md bg-orange-200 dark:bg-zinc-800 lg:rounded-xl p-4 ">
        <p className="text-lg font-semibold hover:tracking-wider transition-all">
          itasks &copy; 2023
        </p>
        <span className='flex gap-2 text-xl'>
          Powered by
          <Link className='font-semibold hover:tracking-wider transition-all' href='https://mateusdev.com.br' target="_blank">
            Mateus Azevedo
          </Link>
        </span>
      </div>
    </footer>
  )
}
