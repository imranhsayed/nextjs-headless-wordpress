const ImageThumbnailFragment = `
fragment ImageThumbnailFragment on MediaItem {
	sourceUrl(size: THUMBNAIL)
	srcSet
	title
	sizes
	altText
	mediaDetails {
	  width
	  height
	}
}
`

export default ImageThumbnailFragment
