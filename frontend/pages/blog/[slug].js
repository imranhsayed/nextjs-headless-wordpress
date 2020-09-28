import client from "../../src/apollo/client";
import { GET_POST } from "../../src/queries/get-post";
import Layout from "../../src/components/layout";
import { GET_POST_SLUGS } from "../../src/queries/get-posts";
import { sanitize } from "../../src/utils/functions";

const SingleBlog = ({menus, post, path}) => {
	return (
		<Layout menus={menus}>
			<h1 dangerouslySetInnerHTML={{__html: sanitize(post.title)}}/>
			<div dangerouslySetInnerHTML={{__html: sanitize(post.excerpt)}}/>
		</Layout>
	)
}

export default SingleBlog

export async function getStaticProps({ params }) {
	console.warn( 'slug', params?.slug ?? '' );
	const { data } = await client.query({
		query: GET_POST,
		variables: {
			slug: params?.slug ?? ''
		}
	});

	return {
		props: {
			menus: data?.headerMenus?.edges ?? [],
			post: data?.post ?? {},
			path: params?.slug
		},
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_POST_SLUGS,
	});

	const pathsData = [];

	data.posts.edges.map( post => {
		pathsData.push(
			{ params: { slug: post.node.slug } }
		)
	} )

	console.warn( 'pathsData', pathsData );

	return {
		paths: pathsData,
		fallback: false
	};
}

