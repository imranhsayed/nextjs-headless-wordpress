import { useRouter } from "next/router";
import { getPageOffset, PER_PAGE_FIRST, PER_PAGE_REST } from "../../../src/utils/pagination";
import client from "../../../src/apollo/client";
import Layout from "../../../src/components/layout";
import Pagination from "../../../src/components/blog/pagination";
import Posts from "../../../src/components/blog/posts";
import {GET_POSTS, GET_TOTAL_POSTS_COUNT} from "../../../src/queries/posts/get-posts";

const Page = ({data}) => {
    const { posts } = data;
    const router = useRouter();

    const { pageInfo } = posts ?? {};
    const totalPostsCount = pageInfo?.offsetPagination?.total ?? 0;

    const pagesCount = Math.ceil((totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1);

    // Redirecting to /blog if we are on page 1
    const pageNo = router?.query?.pageNo ?? 1;

    if (typeof window !== "undefined" && pageNo === "1") {
        router.push("/blog");
    }

    return (
        <Layout data={data}>
            <Posts posts={posts}/>
            <Pagination pagesCount={pagesCount} postName="blog" />
        </Layout>
    );
};

export default Page;

export async function getStaticProps({ params }) {
    //Note: pageNo is in string
    const { pageNo } = params || {};
    const offset = getPageOffset(pageNo);
    const variables = {
        perPage: pageNo === "1" ? PER_PAGE_FIRST : PER_PAGE_REST,
        offset,
    };

    const { data } = await client.query({
        query: GET_POSTS,
        variables,
    });
    return {
        props: {
            data: {
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

export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_TOTAL_POSTS_COUNT,
    });
    const totalPostsCount = data?.postsCount?.pageInfo?.offsetPagination?.total ?? 0;
    //* since the first page posts and other page posts will be different, we subtract the no of posts we'll show on first page and then divide the result with the no of posts we'll show on other pages and then will add 1 for the first page that we subtracted.
    const pagesCount = Math.ceil((totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1);
    const paths = new Array(pagesCount).fill("").map((_, index) => ({
        params: {
            pageNo: (index + 1).toString(),
        },
    }));

    return {
        paths: [...paths],
        fallback: false,
    };
}
