import { NextSeo } from 'next-seo'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ({ seo, uri }) => {
    const {
        canonical,
        title,
        metaDesc,
        metaRobotsNoindex,
        metaRobotsNofollow,
        opengraphDescription,
        opengraphTitle,
        featuredOgImage,
        opengraphImage,
        opengraphSiteName
    } = seo

    const currentLocation = process.browser ? window.location.origin : null
    const opengraphUrl = (process.env.NEXT_PUBLIC_NEXTJS_SITE_URL ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL : currentLocation) + uri

    return (
        <NextSeo
            title={title}
            description={opengraphDescription || metaDesc}
            canonical={canonical || opengraphUrl}
            noindex={metaRobotsNoindex}
            nofollow={metaRobotsNofollow}
            openGraph={{
                type: 'website',
                locale: 'en_US',
                url: opengraphUrl,
                title: opengraphTitle,
                description: opengraphDescription,
                images: [
                    {
                        url: !isEmpty(featuredOgImage) ? featuredOgImage : opengraphImage?.sourceUrl,
                        width: 1280,
                        height: 720
                    }
                ],
                site_name: opengraphSiteName
            }}
            twitter={{
                handle: '@Codeytek',
                site: '@Codeytek',
                cardType: 'summary_large_image'
            }}
        />
    )
}

Seo.propTypes = {
    seo: PropTypes.object
}

Seo.defaultProps = {
    seo: {
        canonical: '',
        title: '',
        metaDesc: '',
        metaRobotsNoindex: '',
        metaRobotsNofollow: '',
        opengraphDescription: '',
        opengraphTitle: '',
        opengraphImage: {
            sourceUrl: ''
        },
        opengraphUrl: '',
        opengraphSiteName: ''
    }
}

export default Seo
