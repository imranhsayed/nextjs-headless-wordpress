
import {getAuthToken} from '../../src/utils/cookies';
import {isEmpty} from 'lodash';
import {getPreviewRedirectUrl} from '../../src/utils/redirects';

// http://localhost:3000/api/preview/?postType=page&postId=30
export default async function preview( req, res ) {
	const {postType, postId} = req.query;

	const authToken = getAuthToken( req );

	if ( isEmpty( authToken ) ) {
		res.writeHead( 307, {Location: `/login/?postType=${postType}&previewPostId=${postId ?? ''}`} );
	} else {
		const previewUrl = getPreviewRedirectUrl( postType, postId );
		res.writeHead( 307, {Location: previewUrl} );
	}
	res.end();
}
