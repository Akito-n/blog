import Link from 'next/link'

export const Header = (): JSX.Element => {
  return (
    <nav className="fixed flex flex-wrap items-center justify-between w-full p-6 bg-primary-dark bg-teal">
      <div className="flex items-center mr-6 text-white flex-no-shrink">
        <span className="text-xl font-semibold tracking-tight">
          <Link href="/">
            <a className="text-white no-underline">Saboten Blog</a>
          </Link>
        </span>
      </div>
    </nav>
  )
}
