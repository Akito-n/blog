import { GraphQLClient } from 'graphql-request'
import { AuthorProp } from './author'
const { GRAPH_CMS_API } = process.env

export type PostProp = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: {
    html: string
    markdown: string
    raw: string
  }
  date: Date
  tags: [
    {
      id: string
      name: string
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
            height
            width
          }
        }
      }
    `
  )

  return posts
}

const getAllPostSlugs = async () => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { posts } = await graphcms.request(
    `
      { 
        posts{
          slug
        }
      }
    `
  )
  const postSlugs = posts.map(({ slug }) => ({
    params: { slug }
  }))

  return postSlugs
}

const getPostData = async (slug: string) => {
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
