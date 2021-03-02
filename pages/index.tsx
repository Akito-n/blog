import Image from 'next/image'
import { Layout } from '../components/Layout'
import { author, AuthorProp } from '../lib/author'

export const getStaticProps = async (): Promise<{
  props: {
    authors: [AuthorProp]
  }
}> => {
  return author()
}

export const Home = ({ authors }: { authors: [AuthorProp] }): JSX.Element => (
  <Layout home>
    <div className="container">
      <main>
        {authors
          ? authors.map((author) => {
              return (
                <div key={author.id}>
                  <p>{author.name}</p>
                  <Image src={author.picture.url} width={144} height={144} />
                </div>
              )
            })
          : 'loading'}
      </main>
    </div>
  </Layout>
)

export default Home
