import Link from 'next/link'

export const Header = (): JSX.Element => {
  return (
    <>
      <nav className="fixed z-10 flex flex-wrap items-center justify-between w-full p-5 bg-primary-dark bg-teal">
        <div className="flex items-center mr-6 text-white flex-no-shrink">
          <span className="text-xl font-semibold tracking-tight">
            <Link href="/">
              <a className="text-white no-underline">Saboten Blog</a>
            </Link>
          </span>
        </div>
      </nav>
      <nav className="fixed z-10 justify-between w-full pb-1 top-16 bg-primary "></nav>
    </>
  )
}
