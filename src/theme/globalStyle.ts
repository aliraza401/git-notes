import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  button:hover > span {
    /* color: white; */
    /* border-color: white; */
  } 
`;

export default GlobalStyle;
