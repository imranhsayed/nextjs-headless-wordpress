import { gql } from "@apollo/client";
import MenuFragment from "./fragments/menus";

export const GET_MENUS = gql`
   query GET_MENUS {
      headerMenus: menuItems(where: { location: HCMS_MENU_HEADER }) {
         edges {
            node {
			   ...MenuFragment
               childItems {
                  edges {
                     node {
						...MenuFragment
                     }
                  }
               }
            }
         }
      }
      footerMenus: menuItems(where: { location: HCMS_MENU_FOOTER }) {
         edges {
            node {
			   ...MenuFragment
               childItems {
                  edges {
                     node {
						...MenuFragment
                     }
                  }
               }
            }
         }
      }
   }
   ${MenuFragment}
`;
