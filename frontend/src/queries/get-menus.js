import { gql } from "@apollo/client";

export const GET_MENUS = gql`
   query GET_MENUS {
      headerMenus: menuItems(where: { location: HCMS_MENU_HEADER }) {
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
   }
`;
