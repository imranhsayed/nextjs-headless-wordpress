import client from "../src/apollo/client";
import Layout from "../src/components/layout";
import {GET_PAGE} from "../src/queries/pages/get-page";

export default function Home( {data} ) {
	console.log( 'data', data );
  return (
	<Layout data={data}>
		content
	</Layout>
  )
}

export async function getStaticProps(context) {

	const { data, loading, networkStatus } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: "/",
		},
	});

	return {
		props:{
			data: {
				header: data?.header || [],
				menus: {
					headerMenus: data?.headerMenus?.edges || [],
					footerMenus: data?.footerMenus?.edges || [],
				},
				footer: data?.footer || [],
				page: data?.page || []
			}
		},
		revalidate: 1
	}
}
