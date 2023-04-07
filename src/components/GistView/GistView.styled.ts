import { StyledGistViewProps, ViewType } from "./GistView.interface";
import styled from "styled-components";

export const StyledGistView = styled.div<StyledGistViewProps>`
  .ant-card-cover {
    height: 300px;
    overflow: hidden;
  }
  .detailView {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 50px;
      padding-bottom: 20px;
      .icons > * {
        padding: 4px 8px;
        cursor: pointer;
        color: ${({ theme }) => theme["@primary-color"]};
      }
    }

    .body {
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e8e8e8;
      padding: 10px;
      border-radius: 5px;
      overflow-x: hidden;
      ${({ viewType }) =>
        viewType === ViewType.userProfile &&
        `
        height: 200px;
        overflow: hidden;
        margin-bottom: 30px
      `}
      .title {
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
`;
