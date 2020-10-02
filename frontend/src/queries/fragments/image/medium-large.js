const ImageMediumLargeFragment = `
fragment ImageMediumLargeFragment on MediaItem {
	sourceUrl(size: MEDIUM_LARGE)
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

export default ImageMediumLargeFragment
