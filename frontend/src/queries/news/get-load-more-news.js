import { gql } from '@apollo/client';
import PostFragment from '../fragments/post';

/**
 * Get GET_LOAD_MORE_NEWS
 *
 */
export const GET_LOAD_MORE_NEWS = gql`
 query GET_LOAD_MORE_NEWS( $first: Int, $after: String ) {
  posts: posts(first: $first, after: $after) {
    edges {
      node {
        ...PostFragment
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
 }
 ${PostFragment}
 `
