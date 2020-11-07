import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
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
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
	  }
	}
	${MenuFragment}
`;
