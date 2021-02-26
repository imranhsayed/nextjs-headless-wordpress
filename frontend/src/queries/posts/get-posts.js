
import { gql } from '@apollo/client'
import MenuFragment from '../fragments/menus'
import SeoFragment from "../fragments/seo";
import {HeaderFooter} from "../get-menus";
import ImageFragment from "../fragments/image";

/**
 * Get Header menu
 *
 */
export const GET_POSTS = gql`
 query GET_POSTS( $uri: String, $perPage: Int, $offset: Int ) {
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

export const GET_TOTAL_POSTS_COUNT = gql`
  query GET_TOTAL_POSTS_COUNT {
  postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

/**
 * Get pages.
 *
 */
export const GET_POST_SLUGS = gql`
 query GET_POST_SLUGS {
  posts: posts(last: 1) {
    nodes {
      id
      slug
    }
  }
 }
 `;
