import { PostProp } from 'lib/posts'

const sortDesc = (posts: [PostProp]): [PostProp] => {
  return posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

export { sortDesc }
