import { Layout } from '../../components/Layout'
import { getAllTagSlugs, getTagData, TagProp } from 'lib/tag'
import React from 'react'
import PostCard from 'components/PostCard'

export const getStaticProps = async ({ params }) => {
  const tagData = await getTagData(params.slug)
  return {
    props: {
      tagData
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllTagSlugs()
  return {
    paths,
    fallback: false
  }
}

const Tag = ({ tagData }: { tagData: TagProp }): JSX.Element => {
  return (
    <Layout>
      <div className="flex justify-center mx-auto my-5">
        <span>{tagData.name}</span>の記事一覧
      </div>
      <div className="flex justify-center mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {tagData.posts.map((post) => {
            return <PostCard key={post.id} post={post} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Tag
