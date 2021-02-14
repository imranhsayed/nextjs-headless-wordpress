import client from "../../../src/apollo/client";
import { GET_PAGE_BY_ID} from "../../../src/queries/pages/get-page";
import Layout from "../../../src/components/layout";
import {handleRedirectsAndReturnData} from "../../../src/utils/slug";
import {getAuthToken} from "../../../src/utils/cookies";
import {sanitize} from "../../../src/utils/miscellaneous";

const PagePreview = ({ data }) => {
    return (
        <Layout data={data}>
            <div dangerouslySetInnerHTML={{__html: sanitize(data?.page?.content ?? {})}}/>
        </Layout>
    );
}

export default PagePreview;

export async function getServerSideProps(context) {

    const authToken = getAuthToken(context.req);

    const { params } = context || {}
    const { data, errors } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: Number(params?.id ?? ''),
        },
        context: {
            headers: {
                authorization: authToken ? `Bearer ${authToken}` : "",
            }
        }
    });

    const defaultProps = {
        props: {
            data:  data || {}
        }
    };

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
