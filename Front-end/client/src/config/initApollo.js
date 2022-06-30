import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Cookies from "js-cookie";
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  // credentials: 'same-origin'
})

const authLink = setContext((_,{headers}) => {
  if(Cookies.get('token')!==undefined){
    // console.log(Cookies.get('token'))
    const token = Cookies.get('token')
    const newHeader = {
      headers:{
        ...headers,
        authorization: `Bearer ${token}`,
      }
    }
    // console.log(newHeader)
    return newHeader
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});

export default client