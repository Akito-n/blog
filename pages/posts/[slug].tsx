import { Layout } from '../../components/Layout'
import Image from 'next/image'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/railscasts.css'
import Icon from 'components/icon'
import Topic, { Toc } from 'components/Topic'

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

const toc: [Toc | undefined | null] = [null]
const Post = ({ postData }) => {
  const renderer = new marked.Renderer()
  renderer.heading = (text, level) => {
    const slug = encodeURI(text.toLowerCase())
    console.log(slug)
    toc.push({
      level: level,
      slug: slug,
      title: text
    })

    return '<h' + level + ' id="' + slug + '">' + text + '</h' + level + '>\n'
  }

  marked.setOptions({
    renderer,
    langPrefix: 'hljs language-',
    highlight: (code, lang) => {
      const validLanguage = highlight.getLanguage(lang) ? lang : 'plaintext'
      return highlight.highlight(validLanguage, code).value
    }
  })

  console.log(toc)
  return (
    <Layout>
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
          <nav className="sticky p-3 bg-white rounded-sm top-20 right-20">
            <div className="flex justify-around">
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
            <div>
              <ul className="list-none">
                {toc.map((t, i) => (
                  <Topic toc={t} key={i} />
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default Post
