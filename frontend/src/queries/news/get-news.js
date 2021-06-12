
import { gql } from '@apollo/client'
import MenuFragment from '../fragments/menus'
import SeoFragment from "../fragments/seo";
import {HeaderFooter} from "../get-menus";
import ImageFragment from "../fragments/image";
import PostFragment from '../fragments/post';

/**
 * Get News Posts
 *
 */
export const GET_NEWS = gql`
 query GET_NEWS( $uri: String, $first: Int, $after: String ) {
 ${HeaderFooter}
  page: pageBy(uri: $uri) {
    id
    title
    content
    slug
    uri
    seo {
      ...SeoFragment
    }
  }
  posts: posts(first: $first, after: $after) {
    edges {
      node {
        ...PostFragment
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
      hasNextPage
      endCursor
    }
  }
 }
 ${MenuFragment}
 ${ImageFragment}
 ${SeoFragment}
 ${PostFragment}
 `;
