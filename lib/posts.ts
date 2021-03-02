import { GraphQLClient } from 'graphql-request'
import { AuthorProp } from './author'
const { GRAPH_CMS_API } = process.env

export type PostProp = {
  id: string
  title: string
  slug: string
  date: Date
  tags: {
    id: string
    name: string
  }
  CoverImage: {
    id: string
    url: string
  }
  author: AuthorProp
}

const allPosts = async (): Promise<{ posts: [PostProp] }> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { posts } = await graphcms.request(
    `
      { 
        posts{
          id
          title
          slug
          date
          tags{
            name
            id
          }
          author{
            name
            picture{
              id
              url
            }
          }
          coverImage {
            id
            url
          }
        }
      }
    `
  )

  return posts
}

export { allPosts }
