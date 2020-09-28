import { gql } from '@apollo/client'
import MenuFragment from './fragments/menus'

/**
 * Get Header menu
 *
 */
export const GET_POST = gql`
 query GET_POST( $slug: String ) {
  headerMenus: menuItems(where: {location: HCMS_MENU_HEADER}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }
  footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }
  post: postBy(slug: $slug) {
    id
    title
    excerpt
  }
 }
 ${MenuFragment}
 `;
