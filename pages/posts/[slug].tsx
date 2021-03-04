import { Layout } from '../../components/Layout'
import Image from 'next/image'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/railscasts.css'
import Icon from 'components/icon'
import Topic, { Toc } from 'components/Topic'
import Link from 'next/link'

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

  return (
    <Layout>
      <div className="grid grid-cols-12 mx-auto">
        <div className="col-span-6 col-start-2 bg-white">
          <div className="max-w-full">
            <Image
              src={postData.coverImage.url}
              width={postData.coverImage.width || 1080}
              height={postData.coverImage.height || 675}
            />
          </div>
          <div className="p-5">
            <div className="text-2xl font-bold">{postData.title}</div>
            <div className="font-mono text-gray-600 text-md">
              {postData.date}
            </div>
            <div className="my-3">
              {postData.tags.map((tag) => {
                return (
                  <span
                    key={tag.id}
                    className="p-1 px-2 mx-2 text-xs text-gray-200 bg-gray-800 border rounded"
                  >
                    {tag.name}
                  </span>
                )
              })}
            </div>
            <div id="body" className="markdown">
              <span
                dangerouslySetInnerHTML={{ __html: marked(postData.content) }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 col-start-8 pl-10 mt-24">
          <nav className="sticky p-3 bg-white rounded-sm top-20 right-20">
            <div className="flex justify-around">
              <div className="grid items-end justify-items-stretch">
                <Link href="https://twitter.com/naki415">
                  <a className="text-blue-400" target="_blank">
                    <Icon icon="twitter" size={25} />
                  </a>
                </Link>
                <Link href="https://github.com/Akito-n">
                  <a className="text-black" target="_blank">
                    <Icon icon="github" size={25} />
                  </a>
                </Link>

                <Icon icon="facebook2" size={25} color="black" />
              </div>
              <div className="-ml-5">
                <Image
                  src={postData.author.picture.url}
                  width={144}
                  height={144}
                />
                <p className="text-center">{postData.author.name}</p>
              </div>
            </div>
            <div>
              <p className="text-center">{postData.author.biography}</p>
            </div>
            <div className="">
              <div></div>
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
