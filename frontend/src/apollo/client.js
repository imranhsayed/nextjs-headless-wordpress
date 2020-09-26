import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
}

console.warn( 'process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL', process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL );

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache({
	resultCaching: false
});
const link = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
});

const client = new ApolloClient({
	cache,
	link,
	defaultOptions: defaultOptions,
});

export default client;
