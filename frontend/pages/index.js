import Layout from "../src/components/layout";
import { GET_MENUS } from "../src/queries/get-menus";
import client from "../src/apollo/client";

const Home = ({ menus }) => {

	return (
		<Layout menus={menus}>
			<div
				style={{ margin: "50px", justifyContent: "center", display: "flex", fontSize: "60px" }}
			>
				Welcome!
			</div>
		</Layout>
	);
};

export default Home;

export async function getStaticProps() {
	const { data, loading, networkStatus } = await client.query({
		query: GET_MENUS,
	});

	return { props: { menus: data?.headerMenus?.edges ?? [] } };
}
