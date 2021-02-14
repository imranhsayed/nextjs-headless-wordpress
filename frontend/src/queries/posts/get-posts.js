
import { gql } from '@apollo/client'

/**
 * Get pages.
 *
 */
export const GET_POSTS_URI = gql`
 query GET_POSTS_URI {
  posts: posts(last: 1) {
    nodes {
      id
      uri
    }
  }
 }
 `;
