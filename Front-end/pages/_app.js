import { ApolloProvider } from '@apollo/client/react';
import client from '../src/configs/initApollo'
import "antd/dist/antd.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider> 
)
}
export default MyApp