import { ApolloProvider } from "@apollo/client";
import client from "../src/apollo/client";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
