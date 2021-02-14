import {isEmpty} from 'lodash';

export const getPreviewRedirectUrl = (postType = '', previewPostId = '') => {

    if ( isEmpty(postType) || isEmpty(previewPostId) ) {
    	return '';
    }

    switch (postType) {
        case 'post':
            return `/blog/preview/${previewPostId}/`
        case 'page':
            return `/page/preview/${previewPostId}/`
        default:
            return '/'
    }
}
