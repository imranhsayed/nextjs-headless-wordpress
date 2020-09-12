import { gql } from "@apollo/client";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
	  headerMenus: menuItems(where: {location: HCMS_MENU_HEADER}) {
	    edges {
	      node {
	        id
	        label
	        url
	        path
	        childItems {
	          edges {
	            node {
	              id
	              menuItemId
	              label
	              url
	            }
	          }
	        }
	      }
	    }
	  }
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
	  }
	}
`;
