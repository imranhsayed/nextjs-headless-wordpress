import client from "../../src/apollo/client";
import Layout from "../../src/components/layout";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
import {handleRedirectsAndReturnData} from "../../src/utils/slug";
import {GET_NEWS} from "../../src/queries/news/get-news";
import LoadMorePosts from "../../src/components/news/load-more-posts";

const News = ({ data }) => {
    return (
        <Layout data={data}>
            <LoadMorePosts posts={data?.posts}/>
        </Layout>
    );
};

export default News;

export async function getStaticProps() {
    const { data, errors } = await client.query({
        query: GET_NEWS,
        variables: {
            uri: '/news/',
            perPage: PER_PAGE_FIRST,
            offset: null,
        },
    });

    const defaultProps = {
        props: {
            data:  data || {}
        },
        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'posts' );
}
