import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
    clientState: {
        defaults: {
            auth: {
                __typename: "Auth",
                isLoggedIn: Boolean(localStorage.getItem("jwt"))
            }
        },
        resolvers: {
            Mutation: {
                logUserIn: (obj, args, context, info) => {
                    const cache = context.cache;
                    const {token} = args;
                    localStorage.setItem("jwt", token);
                    cache.writeData({
                        data: {
                            auth: {
                                __typename: "Auth",
                                isLoggedIn:true
                            }
                        }
                    })
                    return null;
                },
                logUserOut: (obj, args, context, info) => {
                    localStorage.removeItem("jwt");
                    const cache = context.cache;
                    cache.writeData({
                        data: {
                            auth:{
                                __typename: "Auth",
                                isLoggedIn: false
                            }
                        }
                    })
                    return null;
                }
            }
        }
    },
    request: async (operation: Operation) => {
        operation.setContext({
            headers: {
                "X-JWT": localStorage.getItem("jwt") || ""
            }
        })
    },
    uri: "http://localhost:4000/graphql"
})

export default client;