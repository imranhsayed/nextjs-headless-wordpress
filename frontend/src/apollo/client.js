import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import {isEmpty} from 'lodash';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {

	// get the authentication token from local storage if it exists
	const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAyMCIsImlhdCI6MTYxMzI0MTUwMywibmJmIjoxNjEzMjQxNTAzLCJleHAiOjE2MTMyNDE4MDMsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.3T7n1kzam5z_kbzb6pHtDyoARb2AGQ3gNEM8MTuBpXg";
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		}
	}
});

const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

const link = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
	credentials: 'include'
})

const client = new ApolloClient({
	connectToDevTools: true,
	// link: authLink.concat(link),
	link,
	cache,
	defaultOptions
});

export default client;
