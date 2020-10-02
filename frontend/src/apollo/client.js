import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

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

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache({
    resultCaching: false,
});
const link = createHttpLink({
    // uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    uri: "http://localhost:8020/graphql",
});

const client = new ApolloClient({
    cache,
    link,
    defaultOptions: defaultOptions,
});

export default client;
