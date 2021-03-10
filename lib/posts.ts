import { GraphQLClient } from 'graphql-request'
import { AuthorProp } from './author'
const { GRAPH_CMS_API } = process.env

export type PostProp = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: Date
  content: string
  tags: [
    {
      id: string
      name: string
      slug: string
    }
  ]
  coverImage: {
    id: string
    url: string
    height: string
    width: string
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
          excerpt
          tags{
            name
            id
            slug
          }
          author{
            name
            biography
            picture{
              id
              url
            }
          }
          coverImage {
            id
            url
            height
            width
          }
        }
      }
    `
  )

  return posts
}

const getAllPostSlugs = async (): Promise<
  {
    params: {
      slug: string
    }
  }[]
> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { posts }: { posts: { slug: string }[] } = await graphcms.request(
    `
      {
        posts{
          slug
        }
      }
    `
  )
  const postSlugs = posts.map(({ slug }: { slug: string }): {
    params: { slug: string }
  } => ({
    params: { slug }
  }))

  return postSlugs
}

const getPostData = async (slug: string): Promise<any> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { post } = await graphcms.request(
    `
      query getPostQuery($slug: String!){
        post(where:{slug: $slug}){
          title
          id
          date
          author {
            name
            biography
            picture {
              id
              url
            }
          }
          coverImage {
            id
            url
            width
            height
          }
          content
          tags {
            id
            name
            slug
          }
        }
      }
    `,
    { slug }
  )
  return {
    ...post
  }
}

export { allPosts, getAllPostSlugs, getPostData }
