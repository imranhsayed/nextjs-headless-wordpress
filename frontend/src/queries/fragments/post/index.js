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
`
export default PostFragment;
