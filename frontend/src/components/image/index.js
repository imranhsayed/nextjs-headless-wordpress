import Img from 'next/image';

import PropTypes from 'prop-types';

/**
 * Image Component.
 * We don't need to add srcSet, as Next js will generate that.
 * @see https://nextjs.org/docs/api-reference/next/image#other-props
 * @see https://nextjs.org/docs/basic-features/image-optimization#device-sizes
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Image = ( props ) => {
    const { altText, title, width, height, sourceUrl, className, sizes, layout, objectFit, ...rest } = props;

    if ( ! sourceUrl ) {
        return null;
    }

    /**
     * If we use layout = fill then, width and height of the image cannot be used.
     * and the image fills on the entire width and the height of its parent container.
     * That's we need to wrap our image in a container and give it a height and width.
     */
    if ( "fill" === layout ) {
        const attributes = {
            alt: altText || title,
            src: sourceUrl,
            layout: "fill",
            objectFit: "cover",
            className,
            ...rest
        };

        return (
            <div style={{position: 'relative', width: `${width || '300px'}`, height: `${height || '200px'}`}}>
                <Img { ...attributes } />
            </div>
        )
    } else {
        const attributes = {
            alt: altText || title,
            src: sourceUrl,
            width: width || 'auto',
            height: height || 'auto',
            className,
            ...rest
        };
        return <Img { ...attributes } />
    }
};

Image.propTypes = {
    altText: PropTypes.string,
    title: PropTypes.string,
    sizes: PropTypes.string,
    sourceUrl: PropTypes.string,
    srcSet: PropTypes.string,
    layout: PropTypes.string,
    objectFit: PropTypes.string
};

Image.defaultProps = {
    altText: '',
    title: '',
    sizes: '',
    sourceUrl: '',
    srcSet: '',
    className: 'post__image',
};

export default Image;
