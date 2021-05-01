import { gql } from '@apollo/client';
import ImageFragment from '../fragments/image';

/**
 * GET_SEARCH_RESULTS
 *
 */
export const GET_SEARCH_RESULTS = gql`
 query GET_SEARCH_RESULTS( $first: Int, $after: String, $query: String ) {
  posts: posts(first: $first, after: $after, where: {search: $query}) {
    edges {
      node {
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
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
 }
 ${ImageFragment}
 `;
