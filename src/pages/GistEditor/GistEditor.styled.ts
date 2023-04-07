import styled from "styled-components";

export const StyledEditGist = styled.div`
  margin-top: 20px;
  input {
    margin-bottom: 20px;
  }
  /* @TODO-Move button to seprate component  */
  button {
    margin-top: 20px;
    background-color: ${({ theme }) => theme["@primary-color"]};
    color: white;
    padding-left: 25px;
    padding-right: 25px;
    transition: 0.2s ease-in-out;
  }
`;
