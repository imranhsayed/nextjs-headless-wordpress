
import { gql } from '@apollo/client'
import MenuFragment from '../fragments/menus'
import SeoFragment from "../fragments/seo";
import {HeaderFooter} from "../get-menus";
import ImageFragment from "../fragments/image";

/**
 * Get News Posts
 *
 */
export const GET_NEWS = gql`
 query GET_NEWS( $uri: String, $perPage: Int, $offset: Int ) {
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
  posts: posts(where: { offsetPagination: { size: $perPage, offset: $offset }}) {
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
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
 }
 ${MenuFragment}
 ${ImageFragment}
 ${SeoFragment}
 `;
