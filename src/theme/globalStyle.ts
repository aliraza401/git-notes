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
  .icon-base {
    font-size: 20px;
    margin-right: 8px;
  }
`;

export default GlobalStyle;
