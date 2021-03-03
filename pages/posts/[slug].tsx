import { Layout } from '../../components/Layout'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/railscasts.css'
import Icon from 'components/icon'

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
      <div className="flex justify-center mx-auto">
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
        <div className="mt-24">
          <nav className="sticky top-20 right-20">
            <div>
              <Icon icon="twitter" size={20} />
              <Icon icon="github" size={20} />
              <Icon icon="facebook2" size={20} />
            </div>
            <div>my-info</div>
            <div>mokuzi</div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default Post
