import AnchorLink from 'react-anchor-link-smooth-scroll'
export type Toc = {
  level: number
  slug: string
  title: string
}
const Topic = ({ toc }: { toc: Toc | undefined | null }): JSX.Element => {
  if (!toc) return <></>

  const link = (
    <AnchorLink
      className="block p-2 text-black no-underline hover:bg-gray-200"
      href={`#${toc.slug}`}
      offset={80}
    >
      {toc.title}
    </AnchorLink>
  )
  let topic = <></>
  switch (toc.level) {
    case 1:
      topic = <li>{link}</li>
      break
    case 2:
      topic = (
        <ul className="list-none">
          <li>{link}</li>
        </ul>
      )
      break
    case 3:
      topic = (
        <ul className="ml-5 list-none">
          <li>{link}</li>
        </ul>
      )
      break
    default:
      topic = <></>
  }
  return topic
}

export default Topic
