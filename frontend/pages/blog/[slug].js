import client from "../../src/apollo/client";
import {isEmpty} from 'lodash';
import { useRouter } from 'next/router'
import Layout from "../../src/components/layout";
import {FALLBACK, handleRedirectsAndReturnData, isCustomPageUri} from "../../src/utils/slug";
import {GET_POST} from "../../src/queries/posts/get-post";
import {GET_POSTS_URI} from "../../src/queries/posts/get-posts";

const Post = ({ data }) => {
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Layout data={data} isPost>
            {router?.query?.slug.join("/")}
        </Layout>
    );
}

export default Post;

export async function getStaticProps({ params }) {
    const { data, errors } = await client.query({
        query: GET_POST,
        variables: {
            uri: params?.slug.join("/"),
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

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'post' );
}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_POSTS_URI
    });

    const pathsData = [];

    data?.posts?.nodes && data?.posts?.nodes.map( page => {
        if ( ! isEmpty( post?.uri ) && ! isCustomPageUri( post?.uri ) ) {
            const slugs = post?.uri?.split('/').filter( postSlug => postSlug );
            pathsData.push( {params: { slug: slugs }} )
        }
    })

    return {
        paths: pathsData,
        fallback: FALLBACK
    };
}
