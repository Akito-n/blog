import Link from 'next/link'

export const Header = (): JSX.Element => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-6 mb-10 bg-primary-dark bg-teal">
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
