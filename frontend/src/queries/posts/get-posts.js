
import { gql } from '@apollo/client'
import MenuFragment from '../fragments/menus'
import ImageThumbnailFragment from "../fragments/image/thumbnail";
import ImageMediumLargeFragment from "../fragments/image/medium-large";
import SeoFragment from "../fragments/seo";
import {HeaderFooter} from "../get-menus";

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
        mediumLarge: featuredImage {
          node {
            ...ImageMediumLargeFragment
          }
        }
        thumbnail: featuredImage {
          node {
            ...ImageThumbnailFragment
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
 ${ImageMediumLargeFragment}
 ${ImageThumbnailFragment}
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
