export type Toc = {
  level: number
  slug: string
  title: string
}
const Topic = ({ toc }: { toc: Toc | undefined | null }): JSX.Element => {
  if (!toc) return <></>

  const link = (
    <a className="block p-3 no-underline" href={`#${toc.slug}`}>
      {toc.title}
    </a>
  )
  let topic = <></>
  switch (toc.level) {
    case 1:
      topic = <li>{link}</li>
      break
    case 2:
      topic = (
        <ul className="p-0 list-none">
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
