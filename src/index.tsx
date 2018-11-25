import React from 'react';
import {ApolloProvider} from "react-apollo";
import ReactDOM from 'react-dom';
import client from "./apollo";
import App from './Components/App';
import Globalstyles from "./global-styles";


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <Globalstyles />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
