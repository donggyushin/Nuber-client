import React from "react";
import {graphql} from "react-apollo";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {  ThemeProvider } from 'src/styled-components';
import theme from '../../theme';
import AppPresenter from "./AppPresenter";
import {IS_LOGGED_IN} from "./AppQueries";


const AppContainer = ({ data }) => (
  <div>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer />
  </div>
);

export default graphql(IS_LOGGED_IN)(AppContainer);