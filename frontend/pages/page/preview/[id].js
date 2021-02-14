import client from "../../../src/apollo/client";
import { GET_PAGE_BY_ID} from "../../../src/queries/pages/get-page";
import { useRouter } from 'next/router'
import Layout from "../../../src/components/layout";
import {FALLBACK, handleRedirectsAndReturnData, isCustomPageUri} from "../../../src/utils/slug";
import {parseCookies} from "../../../src/utils/cookies";

const PagePreview = ({ data }) => {
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

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

    console.log( 'authToken', authToken );

    const { params } = context || {}
    const { data, errors } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: 30,
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

    return defaultProps;

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
