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
  biography?: string | null | undefined
}

const author = async (): Promise<{
  props: {
    authors: [AuthorProp]
  }
}> => {
  const graphcms = new GraphQLClient(GRAPH_CMS_API)
  const { authors } = await graphcms.request(
    `
      { 
        authors {
          id
          name
          picture{
            id
            url
          }
        } 
      }
    `
  )

  return {
    props: {
      authors
    }
  }
}

export { author }
