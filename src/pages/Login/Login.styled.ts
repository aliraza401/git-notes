import styled from "styled-components";

export const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);

  button {
    display: inline-flex;
    align-items: center;
    background-color: #24292e;
    border-radius: 5px;
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 18px 22px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3f4451;
    }
  }
`;
