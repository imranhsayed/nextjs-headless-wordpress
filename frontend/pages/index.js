import client from "../src/apollo/client";
import { GET_MENUS } from "../src/queries/get-menus";
import Layout from "../src/components/layout";

export default function Home( {data} ) {

	return (
		<Layout data={data}>
			content
		</Layout>
	)
}

export async function getStaticProps() {

	const { data } = await client.query({
		query: GET_MENUS
	});

	return {
		props:{
			data:  {
				menus: {
					headerMenus: data?.headerMenus?.edges || [],
					footerMenus: data?.footerMenus?.edges || []
				}
			}
		},
		revalidate: 1
	}
}
