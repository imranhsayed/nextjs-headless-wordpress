import client from "../../../src/apollo/client";
import { GET_PAGE_BY_ID} from "../../../src/queries/pages/get-page";
import Layout from "../../../src/components/layout";
import {handleRedirectsAndReturnData} from "../../../src/utils/slug";
import {parseCookies} from "../../../src/utils/cookies";

const PagePreview = ({ data }) => {
    return (
        <Layout data={data}>
            My Page
        </Layout>
    );
}

export default PagePreview;

export async function getServerSideProps(context) {

    const cookies = parseCookies(context.req);
    const authToken = cookies['auth'];

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
