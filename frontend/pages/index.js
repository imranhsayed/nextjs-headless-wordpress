import client from "../src/apollo/client";
import { GET_MENUS } from "../src/queries/get-menus";

export default function Index() {
  return (
    <div>
	    <h3 className="text-lg leading-6 font-medium text-gray-900">
		    Applicant Information
	    </h3>
    </div>
  )
}

export async function getStaticProps(context) {

	const { data, loading, networkStatus } = await new client.query({
		query: GET_MENUS
	});

	console.warn( 'data', data );

	return {
		props: {}, // will be passed to the page component as props
	}
}
