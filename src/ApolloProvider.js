import React from 'react';
import App from './App'
import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {setContext} from 'apollo-link-context'
import {createUploadLink} from 'apollo-upload-client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const uploadLink = createUploadLink({
    uri: 'http://localhost:5000/'
})
const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: ApolloLink.from([authLink.concat(httpLink), uploadLink]),
    cache: new InMemoryCache()
})



export default (
<ApolloProvider client={client}>
<App/>
</ApolloProvider>
)