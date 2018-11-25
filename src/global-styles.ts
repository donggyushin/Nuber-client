import reset from "styled-reset";
import {createGlobalStyle} from "./styled-components";

// tslint:disable-next-line
const globalstyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
    ${reset}
    
    * {
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration:none;
    }
    input, button {
        &: focus, &:active {
            outline: none;
        }
    }
    body {
        font-family: 'Maven Pro', sans-serif;
    }
    
`;

export default globalstyle;