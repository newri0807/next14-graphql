import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "/api/graphql", // The GraphQL API route you just created
    cache: new InMemoryCache(),
});

export default client;
