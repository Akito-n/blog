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
          <div className="flex justify-between">
            <Link href={`/posts/${post.slug}`}>
              <a className="block no-underline">{post.title}</a>
            </Link>
            <span className="block mr-1">{post.date}</span>
          </div>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs">{post.excerpt}</p>
          </div>
          <div>
            {post.tags.map((tag, i) => {
              if (i > 3) {
                return <></>
              }
              return (
                <span
                  key={tag.id}
                  className="p-2 text-xs text-gray-200 bg-gray-800 border rounded"
                >
                  {tag.name}
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
