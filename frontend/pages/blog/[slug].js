import client from "../../src/apollo/client";
import { GET_POST } from "../../src/queries/get-post";
import Layout from "../../src/components/layout";
import { GET_POST_SLUGS } from "../../src/queries/get-posts";
import { sanitize } from "../../src/utils/functions";
import Image from "../../src/components/image";
import DisqusComment from "../../src/components/blog/discuss-comments";

const SingleBlog = ({menus, post, path}) => {
	return (
		<Layout menus={menus}>
			<div className="flex my-8">
				<div className="w-3/4">
					<h1 className="mb-4" dangerouslySetInnerHTML={{__html: sanitize(post.title)}}/>
					<figure className="overflow-hidden">
						<Image { ...post?.large?.node } placeholder={ post?.thumbnail?.node } />
					</figure>
					<div dangerouslySetInnerHTML={{__html: sanitize(post.content)}}/>
				</div>
				<div className="w-1/4"/>
			</div>
			<DisqusComment post={post}/>
		</Layout>
	)
}

export default SingleBlog

export async function getStaticProps({ params }) {
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

	console.warn( 'pathsData', pathsData );

	data.posts.edges.map( post => {
		pathsData.push(
			{ params: { slug: post.node.slug } }
		)
	} )

	return {
		paths: pathsData,
		fallback: false
	};
}
