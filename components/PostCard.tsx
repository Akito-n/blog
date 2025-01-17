import { PostProp } from 'lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import utilStyle from 'styles/utils.module.css'

const PostCard = ({ post }: { post: PostProp }): JSX.Element => {
  return (
    <div key={post.id}>
      <div className="w-full max-w-sm overflow-hidden bg-white border rounded shadow">
        <div className="relative">
          <div className="h-48 max-w-full bg-center bg-no-repeat bg-cover cursor-pointer">
            <Link href={`/posts/${post.slug}`}>
              <a className={utilStyle.card}>
                <Image
                  src={
                    post.coverImage.url
                      ? post.coverImage.url
                      : '/images/noimage.png'
                  }
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="p-3 mt-10">
          <div className="mb-3 text-sm">
            <span className="block mr-1 text-gray-400">{post.date}</span>
          </div>
          <div className="flex justify-between">
            <Link href={`/posts/${post.slug}`}>
              <a className="text-black no-underline">{post.title}</a>
            </Link>
          </div>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs">
              <Link href={`/posts/${post.slug}`}>
                <a className="text-black no-underline">{post.excerpt}</a>
              </Link>
            </p>
          </div>
          <div>
            {post.tags.map((tag) => {
              return (
                <span
                  key={tag.id}
                  className="p-1 px-2 mx-2 text-xs text-gray-200 bg-gray-800 border rounded"
                >
                  <Link href={`/tags/${tag.slug}`}>
                    <a className="text-white no-underline">{tag.name}</a>
                  </Link>
                </span>
              )
            })}
          </div>
          <p className="text-xs text-gray-500"></p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
