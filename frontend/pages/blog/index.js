import client from "../../src/apollo/client";

import Layout from "../../src/components/layout";
import { GET_POSTS } from "../../src/queries/get-posts";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
import Pagination from "../../src/components/blog/pagination";

const Blog = ({ menus, posts }) => {
    console.warn("posts", posts);
    const pagesCount = totalPagesCount(posts?.pageInfo?.offsetPagination?.total ?? 0);

    return (
        <Layout menus={menus}>
            Blog
            <Pagination pagesCount={pagesCount} postName="blog" />
        </Layout>
    );
};

export default Blog;

// export async function getStaticProps() {
//     const { data, loading, networkStatus } = await client.query({
//         query: GET_POSTS,
//         variables: {
//             perPage: PER_PAGE_FIRST,
//             offset: null,
//         },
//     });

//     console.warn("data", data);

//     return {
//         props: {
//             menus: data?.headerMenus?.edges ?? [],
//             posts: data?.posts,
//         },
//     };
// }
