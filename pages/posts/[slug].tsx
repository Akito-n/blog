import { Layout } from '../../components/Layout'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/railscasts.css'

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
    langPrefix: 'hljs language-',
    highlight: (code, lang) => {
      const validLanguage = highlight.getLanguage(lang) ? lang : 'plaintext'
      return highlight.highlight(validLanguage, code).value
    }
  })
  return (
    <Layout home={false}>
      <section className="flex justify-center mx-auto">
        <div>sns</div>
        <div>
          <div>{postData.title}</div>
          <div>{postData.id}</div>
          <div>{postData.date}</div>
          <div id="body">
            <span
              dangerouslySetInnerHTML={{ __html: marked(postData.content) }}
            />
          </div>
          <div>{postData.tags.map((tag) => tag.name)}</div>
        </div>
        <div>
          <div>my-info</div>
          <div>mokuzi</div>
        </div>
      </section>
    </Layout>
  )
}

export default Post
