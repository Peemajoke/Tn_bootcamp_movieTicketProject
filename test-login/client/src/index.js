import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from '@reach/router'
import Form from './Form'
import Form2 from './Form2'
import { ApolloProvider } from '@apollo/client/react';
import client from './config/initApollo'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Form />
    <Form2 />
    </ApolloProvider>
  </React.StrictMode>
);

