const ImageLargeFragment = `
fragment ImageLargeFragment on MediaItem {
	sourceUrl(size: LARGE)
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

export default ImageLargeFragment
