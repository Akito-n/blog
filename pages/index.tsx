import PostCard from 'components/PostCard'
import Image from 'next/image'
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
      <div>
        <main>
          <div className="flex justify-center mx-auto">
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
        <div className="flex justify-center mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {posts
              ? posts.map((post) => {
                  return <PostCard key={post.id} post={post} />
                })
              : 'loading'}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
