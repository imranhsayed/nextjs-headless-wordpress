
import { gql } from '@apollo/client'

/**
 * Get pages.
 *
 */
export const GET_PAGES_URI = gql`
 query GET_PAGES_URI {
  pages: pages {
    nodes {
      id
      uri
    }
  }
 }
 `;
