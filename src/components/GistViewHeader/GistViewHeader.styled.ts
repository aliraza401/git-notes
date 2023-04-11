import {} from "./GistViewHeader.interface";
import styled from "styled-components";

export const StyledGistViewHeader = styled.div`
  .icons > * {
    padding: 4px 8px;
    cursor: pointer;
    color: ${({ theme }) => theme["@primary-color"]};
  }

  .icon-base {
    font-size: 20px;
    margin-right: 8px;
  }
`;
