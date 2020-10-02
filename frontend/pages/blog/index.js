import client from "../../src/apollo/client";
import Layout from "../../src/components/layout";
import { GET_POSTS } from "../../src/queries/get-posts";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
import Pagination from "../../src/components/blog/pagination";
import Posts from "../../src/components/blog/posts";

const Blog = ({ menus, posts }) => {
    const pagesCount = totalPagesCount(posts?.pageInfo?.offsetPagination?.total ?? 0);

    return (
        <Layout menus={menus}>
	        <Posts posts={posts}/>
            <Pagination pagesCount={pagesCount} postName="blog" />
        </Layout>
    );
};

export default Blog;

export async function getStaticProps() {
    const { data, loading, networkStatus } = await client.query({
        query: GET_POSTS,
        variables: {
            perPage: PER_PAGE_FIRST,
            offset: null,
        },
    });

    return {
        props: {
            menus: data?.headerMenus?.edges ?? [],
            posts: data?.posts,
        },
        revalidate: 1,
    };
}
