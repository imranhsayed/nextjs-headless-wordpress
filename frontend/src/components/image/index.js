import Img from 'next/image';

import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * Image Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Image = ( props ) => {
    const { altText, title, mediaDetails, sourceUrl, className, sizes, ...rest } = props;

    if ( ! sourceUrl ) {
        return null;
    }

    const attributes = {
        alt: ! isEmpty( altText ) ? altText : title,
        height: ! isEmpty( mediaDetails?.height ) ? mediaDetails.height : 'auto',
        width: ! isEmpty( mediaDetails?.width ) ? mediaDetails.width : 'auto',
        sizes: ! isEmpty( sizes ) ? sizes : '',
        src: sourceUrl,
        className,
        ...rest
    };


    return <Img alt="" { ...attributes } />
};

Image.propTypes = {
    altText: PropTypes.string,
    title: PropTypes.string,
    mediaDetails: PropTypes.object,
    sizes: PropTypes.string,
    sourceUrl: PropTypes.string,
    srcSet: PropTypes.string,
};

Image.defaultProps = {
    altText: '',
    title: '',
    mediaDetails: {
        height: '',
        width: ''
    },
    sizes: '',
    sourceUrl: '',
    srcSet: '',
    className: 'post__image',
};

export default Image;
