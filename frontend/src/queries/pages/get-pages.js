import { gql } from '@apollo/client'

/**
 * Get pages.
 *
 */
export const GET_PAGES = gql`
 query GET_PAGES {
  pages: pages {
    nodes {
      id
      slug
    }
  }
 }
 `
