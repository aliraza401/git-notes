import styled from "styled-components";

export const StylednotFound = styled.div`
  margin-top: 100px;
  button {
    background-color: ${({ theme }) => theme["@primary-color"]};
    color: white;
    padding-left: 25px;
    padding-right: 25px;
    transition: 0.2s ease-in-out;
  }
`;
