export type Toc = {
  level: number
  slug: string
  title: string
}
const Topic = ({ toc }: { toc: Toc | undefined | null }): JSX.Element => {
  if (!toc) return <></>

  const topic =
    '<h' +
    toc.level +
    ' id="' +
    toc.slug +
    '">' +
    toc.title +
    '</h' +
    toc.level +
    '>\n'
  return (
    <a href={`#${toc.slug}`}>
      <span
        dangerouslySetInnerHTML={{
          __html: topic
        }}
      />
    </a>
  )
}

export default Topic
