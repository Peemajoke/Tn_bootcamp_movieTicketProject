import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/app.css";
import { ApolloProvider } from "@apollo/client/react";
import client from "../src/config/initApollo";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
