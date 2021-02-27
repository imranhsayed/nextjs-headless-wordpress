
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
  articles: posts(where: { offsetPagination: { size: $perPage, offset: $offset }}) {
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

/**
 * Get pages.
 *
 */
export const GET_NEWS_SLUGS = gql`
 query GET_NEWS_SLUGS {
  articles: posts(last: 1) {
    nodes {
      id
      slug
    }
  }
 }
 `;
