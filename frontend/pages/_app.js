import '../src/styles/index.scss'
import { ApolloProvider } from "@apollo/client";
import client from "../src/apollo/client";
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  return (
      <CookiesProvider>
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
      </CookiesProvider>
  )
}

export default MyApp
