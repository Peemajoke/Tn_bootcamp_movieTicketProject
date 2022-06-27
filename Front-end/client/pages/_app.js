import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/app.css";
import { ApolloProvider } from "@apollo/client/react";
import client from "../src/config/initApollo";
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import store from '../src/redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

const makeStore = () => store
export default withRedux(makeStore)(MyApp)

// export default MyApp;
