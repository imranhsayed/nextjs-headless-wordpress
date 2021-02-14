import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import {HeaderFooter} from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_POST = gql`
	query GET_POST($uri: String) {
      ${HeaderFooter}
	  post: postBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;

export const POST_BY_ID = gql`
	query POST_BY_ID($id: ID!) {
		${HeaderFooter}
	  post(idType: DATABASE_ID, id: $id) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
		status
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
