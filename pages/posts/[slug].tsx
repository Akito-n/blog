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
    <div>
      <div>{postData.title}</div>
      <div>{postData.id}</div>
      <div>{postData.date}</div>
      <div>{JSON.stringify(postData.content)}</div>
      <div>{postData.content.markdown}</div>
      <div>{postData.tags.map((tag) => tag.name)}</div>
    </div>
  )
}

export default Post
