import { gql } from '@apollo/client'
import MenuFragment from './fragments/menus'
import ImageLargeFragment from "./fragments/image/large";
import ImageThumbnailFragment from "./fragments/image/thumbnail";

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
    content
    large: featuredImage {
      node {
		...ImageLargeFragment
      }
    }
    thumbnail: featuredImage {
      node {
		...ImageThumbnailFragment
      }
    }
  }
 }
 ${MenuFragment}
 ${ImageLargeFragment}
 ${ImageThumbnailFragment}
 `;
