import { Layout } from '../../components/Layout'
import Image from 'next/image'
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
        <div className="bg-white pc:max-w-screen-lg">
          <div className="max-w-screen-lg">
            <Image
              src={postData.coverImage.url}
              width={postData.coverImage.width || 1080}
              height={postData.coverImage.height || 675}
            />
          </div>
          <div className="p-5">
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
        </div>
        <div className="pl-10 mt-24">
          <nav className="sticky top-20 right-20">
            <div className="flex">
              <div className="grid items-end justify-items-stretch">
                <Icon icon="twitter" size={25} />
                <Icon icon="github" size={25} />
                <Icon icon="facebook2" size={25} />
              </div>
              <Image
                src={postData.author.picture.url}
                width={144}
                height={144}
              />
            </div>
            <div>
              <p className="text-center">{postData.author.name}</p>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default Post
