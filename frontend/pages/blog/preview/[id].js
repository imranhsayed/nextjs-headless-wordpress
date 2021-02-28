import client from '../../../src/apollo/client';
import { GET_PAGE_BY_ID} from '../../../src/queries/pages/get-page';
import Layout from '../../../src/components/layout';
import {handleRedirectsAndReturnData} from '../../../src/utils/slug';
import {getAuthToken} from '../../../src/utils/cookies';
import {getLoginPreviewRedirectUrl} from '../../../src/utils/redirects';
import {GET_POST_BY_ID} from '../../../src/queries/posts/get-post';
import {sanitize} from '../../../src/utils/miscellaneous';

const PostPreview = ( { data } ) => {
	return (
		<Layout data={data} isPost>
			<div dangerouslySetInnerHTML={{__html: sanitize( data?.post?.content ?? '' )}}/>
		</Layout>
	);
};

export default PostPreview;

export async function getServerSideProps( context ) {

	const authToken = getAuthToken( context.req );

	const { params } = context || {};
	const { data, errors } = await client.query( {
		query: GET_POST_BY_ID,
		variables: {
			id: Number( params?.id ?? '' ),
		},
		context: {
			headers: {
				authorization: authToken ? `Bearer ${authToken}` : '',
			}
		}
	} );

	const defaultProps = {
		props: {
			data: data || {}
		}
	};

	const loginRedirectURL = getLoginPreviewRedirectUrl( 'post', params?.id ?? '' );

	return handleRedirectsAndReturnData( defaultProps, data, errors, 'post', true, loginRedirectURL );

}
