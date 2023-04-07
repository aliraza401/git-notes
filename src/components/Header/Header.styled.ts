import styled from "styled-components";
import { Layout } from "antd";
const { Header: AntdHeader } = Layout;

export const StyledHeader = styled(AntdHeader)`
  background: ${({ theme }) => theme["@primary-color"]};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  .container {
    display: flex;
    justify-content: space-between;
  }

  .rightContainer {
    display: flex;
    align-items: center;
  }

  .ant-input-search {
    background: ${({ theme }) => theme["@primary-color"]};
    display: flex;
    align-items: center;
  }

  button {
    color: ${({ theme }) => theme["@primary-color"]};
    background-color: white;
    padding-left: 25px;
    padding-right: 25px;
    transition: 0.2s ease-in-out;
  }
`;
