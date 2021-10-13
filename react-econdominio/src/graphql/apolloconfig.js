/* eslint-disable no-undef */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import fetch from 'node-fetch';
// setContext <= para agregar la authenticacion
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // Leer el localstorage
  const token = localStorage.getItem('token') || null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
