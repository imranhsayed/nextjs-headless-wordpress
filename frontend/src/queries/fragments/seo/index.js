const SeoFragment = `
fragment SeoFragment on PostTypeSEO {
      breadcrumbs {
        text
        url
      }
      canonical
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      opengraphTitle
      schemaDetails
      opengraphImage {
        sourceUrl
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
}
`

export default SeoFragment
