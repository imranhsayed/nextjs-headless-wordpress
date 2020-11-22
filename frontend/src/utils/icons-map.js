import * as SvgIconsComponent from '../components/icons'

/**
 * Icons Component map.
 *
 * @param {string} slug Slug.
 * @returns {*}
 */
export const getIconComponentBySlug = (slug) => {
    const ComponentsMap = {
        facebook: SvgIconsComponent.Facebook,
        twitter: SvgIconsComponent.Twitter,
        instagram: SvgIconsComponent.Instagram,
        youtube: SvgIconsComponent.Youtube
    }

    if ( (slug in ComponentsMap) ) {
        const IconComponent = ComponentsMap[slug];
        return <IconComponent/>
    } else {
        return null;
    }
}
