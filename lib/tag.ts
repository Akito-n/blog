import { GraphQLClient } from 'graphql-request'
import { PostProp } from './posts'
const { GRAPH_CMS_API } = process.env

export type TagProp = {
  id: string
  name: string
  slug: string
  posts: [PostProp]
}

const getAllTagSlugs = async () => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { tags } = await graphcms.request(
    `
      {
        tags{
          slug
        }
      }
    `
  )
  const tagSlugs = tags.map(({ slug }: { slug: string }) => ({
    params: { slug }
  }))

  return tagSlugs
}

const getTagData = async (slug: string): Promise<{ slug: string }> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { tag } = await graphcms.request(
    `
    query getTagData($slug: String) {
      tag(where: {slug: $slug}){
        id
        name
        slug
        posts{
          id
          title
          slug
          coverImage {
            id
            url
            width
            height
          }
          author{
            name
            biography
            picture{
              id
              url
            }
          }
          content
          tags {
            id
            name
          }
       }
     }
    }
    `,
    { slug }
  )

  return { ...tag }
}

export { getAllTagSlugs, getTagData }
