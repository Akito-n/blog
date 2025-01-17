import { GraphQLClient } from 'graphql-request'
const { GRAPH_CMS_API } = process.env

export type PictureProp = {
  id: string
  url: string
}

export type AuthorProp = {
  id: string
  name: string
  picture: PictureProp
  job: string
  biography: string
}

const author = async (): Promise<{ authors: [AuthorProp] }> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { authors } = await graphcms.request(
    `
      { 
        authors(first: 1) {
          id
          name
          biography
          picture{
            id
            url
          }
        } 
      }
    `
  )

  return authors
}

export { author }
