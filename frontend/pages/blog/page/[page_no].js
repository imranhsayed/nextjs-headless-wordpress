import { useRouter } from "next/router";
import Link from "next/link";
import { getPageOffset, PER_PAGE_FIRST, PER_PAGE_REST } from "../../../src/utils/pagination";
import { GET_POSTS, GET_TOTAL_POSTS_COUNT } from "../../../src/queries/get-posts";
import client from "../../../src/apollo/client";

const Page = ({ data, loading }) => {
	const router = useRouter();

	const { nodes, pageInfo } = data ?? {};
	const totalPostsCount = pageInfo?.offsetPagination?.total ?? 0;

	const pagesCount = Math.ceil(
		(totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
	);
	const pageNo = router?.query?.page_no ?? 1;

	//? Redirecting to /blog if we are on page 1
	if (typeof window !== "undefined" && pageNo === 1) {
		router.push("/blog");
	}

	return (
		<div>
			Hey
		</div>
	);
};

export default Page;

export async function getStaticProps({ params }) {
	const { page_no } = params || {};

	const offset = getPageOffset(page_no)

	const variables = {
		perPage: page_no === "1" ? PER_PAGE_FIRST : PER_PAGE_REST,
		offset,
	};

	const { data, loading, networkStatus } = await client.query({
		query: GET_POSTS,
		variables,
	});

	return {
		props: {
			data: data?.posts ?? {},
			loading,
			networkStatus,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_TOTAL_POSTS_COUNT,
	});
	const totalPostsCount = data?.posts?.pageInfo?.offsetPagination?.total ?? 0;

	//* since the first page posts and other page posts will be different, we subtract the no of posts we'll show n first page and then divide the result with the no of posts we'll show on other pages and then will add 1 for the first page that we subtracted.
	const pagesCount = Math.ceil(
		(totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
	);

	const paths = new Array(pagesCount).fill("").map((_, index) => ({
		params: {
			page_no: (index + 1).toString(),
		},
	}));

	console.warn( 'paths', pagesCount );

	return {
		paths: [...paths],
		fallback: false,
	};
}
