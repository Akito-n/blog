import { Layout } from '../../components/Layout'
import { getAllPostSlugs, getPostData } from '../../lib/posts'

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

const Post = ({ postData }) => {
  return (
    <Layout home={false}>
      <div>{postData.title}</div>
      <div>{postData.id}</div>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.body }} />

      <div>{postData.tags.map((tag) => tag.name)}</div>
    </Layout>
  )
}

export default Post
