import { Layout } from '../../components/Layout'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github-gist.css'

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
  marked.setOptions({
    langPrefix: '',
    highlight: (code, lang) => {
      return highlight.highlightAuto(code, [lang]).value
    }
  })
  return (
    <Layout home={false}>
      <div>{postData.title}</div>
      <div>{postData.id}</div>
      <div>{postData.date}</div>
      <div id="body">
        <span dangerouslySetInnerHTML={{ __html: marked(postData.body) }} />
      </div>

      <div>{postData.tags.map((tag) => tag.name)}</div>
    </Layout>
  )
}

export default Post
