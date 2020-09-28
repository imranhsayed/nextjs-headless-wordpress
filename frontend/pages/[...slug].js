import Layout from "../src/components/layout";
import client from "../src/apollo/client";
import { GET_PAGE } from "../src/queries/get-page";
import { GET_MENUS } from "../src/queries/get-menus";
import { sanitize } from "../src/utils/functions";
import { useRouter } from "next/router";

const Page = ({ menus, page , path }) => {
	const router = useRouter();

	// @TODO 'path' variable can be used later to render custom templates.
	console.warn( 'page', router.query.slug );

	return (
		<Layout menus={menus}>
			<div>
				<p>Slug</p>
				<h1 dangerouslySetInnerHTML={{ __html: sanitize( page?.title ) }}/>
				<div dangerouslySetInnerHTML={{ __html: sanitize( page?.content ) }}/>
			</div>
		</Layout>
	);
};

export default Page;

export async function getStaticProps({ params }) {
	const { data } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join('/')
		}
	});

	return {
		props: {
			menus: data?.headerMenus?.edges ?? [],
			page: data?.page ?? {},
			path: params?.slug.join('/')
		},
	};
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
	const { data, loading, networkStatus } = await client.query({
		query: GET_MENUS,
	});

	const pathsData = [];

	data.headerMenus.edges.map( item => {
		const pathArray = item.node.path.split('/');
		const filteredPaths = pathArray.filter( path => '' !== path );
		pathsData.push(
			{ params: { slug: filteredPaths } }
		)
	} )

	return {
		paths: pathsData,
		fallback: false
	};
}

