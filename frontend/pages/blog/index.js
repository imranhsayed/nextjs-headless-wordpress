import client from "../../src/apollo/client";
import Layout from "../../src/components/layout";
import { GET_POSTS } from "../../src/queries/get-posts";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
import Pagination from "../../src/components/blog/pagination";
import Posts from "../../src/components/blog/posts";

const Blog = ({ data }) => {
    const pagesCount = totalPagesCount(data?.posts?.pageInfo?.offsetPagination?.total ?? 0);

    return (
        <Layout data={data}>
	        <Posts posts={data?.posts}/>
            <Pagination pagesCount={pagesCount} postName="blog" />
        </Layout>
    );
};

export default Blog;

export async function getStaticProps() {
    const { data } = await client.query({
        query: GET_POSTS,
        variables: {
            perPage: PER_PAGE_FIRST,
            offset: null,
        },
    });

    return {
        props: {
	        data:  {
		        menus: {
			        headerMenus: data?.headerMenus?.edges || [],
			        footerMenus: data?.footerMenus?.edges || []
		        },
		        posts: data?.posts,
	        }
        },
        revalidate: 1,
    };
}
