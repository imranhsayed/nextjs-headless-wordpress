import client from "../../src/apollo/client";
import { GET_POST } from "../../src/queries/get-post";
import Layout from "../../src/components/layout";
import { GET_POST_SLUGS } from "../../src/queries/get-posts";

const SingleBlog = ({menus, post}) => {
	return (
		<Layout menus={menus}>
			hey
		</Layout>
	)
}

export default SingleBlog

export async function getStaticProps({ params }) {
	const { data } = await client.query({
		query: GET_POST,
		variables: {
			slug: params.slug?.[1] ?? ''
		}
	});

	return {
		props: {
			menus: data?.headerMenus?.edges ?? [],
			post: data?.post ?? {},
			path: params?.slug.join('/')
		},
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_POST_SLUGS,
	});

	const pathsData = [];

	data.posts.edges.map( item => {

		const preSlug = ['blog'];
		const postSlug = item.node.slug.split('/');
		const pathArray = preSlug.concat( postSlug );

		const filteredPaths = pathArray.filter( path => '' !== path );
		console.warn( 'filteredPaths', filteredPaths );
		pathsData.push(
			{ params: { slug: filteredPaths } }
		)
	} )

	console.warn( 'pathsData', pathsData );

	return {
		paths: pathsData,
		fallback: false
	};
}

