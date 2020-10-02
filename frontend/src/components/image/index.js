import PropTypes from 'prop-types';
import { isEmpty, get } from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * Image Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Image = ( props ) => {
	const { altText, title, mediaDetails, sourceUrl, className, sizes, lazy = true, placeholder = {} } = props;

	if ( ! sourceUrl ) {
		return null;
	}

	const attributes = {
		alt: ! isEmpty( altText ) ? altText : title,
		height: ! isEmpty( mediaDetails ) ? mediaDetails.height : 'auto',
		width: ! isEmpty( mediaDetails ) ? mediaDetails.width : 'auto',
		sizes: ! isEmpty( sizes ) ? sizes : '',
		src: sourceUrl,
		className
	};

	const placeholderSrc = get( placeholder, 'sourceUrl' ) || '';

	if ( placeholderSrc ) {
		attributes.placeholder = (
			<img
				width={ attributes.width }
				height={ attributes.height }
				className="lazy-placeholder-image"
				src={ placeholderSrc }
				alt={ `${ altText || title } placeholder` }
				sizes={ attributes.sizes }
			/> );
	}

	return lazy ? (
		<LazyLoadImage
			{ ...attributes }
			effect="blur"
		/>
	) : (
		/**
		 * For SVG Images.
		 */
		<img alt="" { ...attributes } data-rjs="2" />
	)
};

Image.propTypes = {
	altText: PropTypes.string,
	title: PropTypes.string,
	mediaDetails: PropTypes.object,
	sizes: PropTypes.string,
	sourceUrl: PropTypes.string,
	srcSet: PropTypes.string,
	lazy: PropTypes.bool,
	placeholder: PropTypes.object,
};

Image.defaultProps = {
	altText: '',
	title: '',
	mediaDetails: {
		height: '',
		width: ''
	},
	lazy: true,
	sizes: '',
	sourceUrl: '',
	srcSet: '',
	className: 'post__image',
};

export default Image;
