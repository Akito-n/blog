import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { author, AuthorProp } from '../lib/author'
import { allPosts, PostProp } from '../lib/posts'

export const getStaticProps = async () => {
  const authors = await author()
  const posts = await allPosts()
  const result = {
    props: {
      authors,
      posts
    }
  }
  return result
}

export const Home = ({
  authors,
  posts
}: {
  authors: [AuthorProp]
  posts: [PostProp]
}): JSX.Element => {
  return (
    <Layout>
      <div className="container">
        <main>
          <div>
            {authors
              ? authors.map((author) => {
                  return (
                    <div key={author.id}>
                      <p>{author.name}</p>
                      <Image
                        src={author.picture.url}
                        width={144}
                        height={144}
                      />
                    </div>
                  )
                })
              : 'loading'}
          </div>
        </main>
        <div>
          {posts
            ? posts.map((post) => {
                return (
                  <div key={post.id}>
                    <Link href={`/posts/${post.slug}`}>
                      <a>{post.title}</a>
                    </Link>
                  </div>
                )
              })
            : 'loading'}
        </div>
      </div>
    </Layout>
  )
}

export default Home
