import ImageFragment from '../image';

const PostFragment = `
 fragment PostFragment on Post {
  id
  title
  excerpt
  slug
  featuredImage {
    node {
      ...ImageFragment
    }
  }
 }
 ${ImageFragment}
`
export default PostFragment;
