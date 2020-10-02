const MenuFragment = `
fragment MenuFragment on MenuItem {
    id
    label
    url
    path
    childItems {
      edges {
        node {
          id
          label
          url
          path
        }
      }
    }
}
`

export default MenuFragment
