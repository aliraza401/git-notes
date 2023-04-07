import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React from "react";
import { HomeProps, StyledHomeProps } from "./Home.interface";

import styled from "styled-components";

export const StyledHome = styled.div<StyledHomeProps>`
  .display-options {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 20px;
    .display-icon {
      svg {
        cursor: pointer;
        height: 24px;
        width: 24px;
      }
      padding: 5px;
    }
    .display-icon.grid {
      color: ${({ layoutType, theme }) =>
        layoutType === "grid" ? theme["@primary-color"] : "gray"};
    }
    .display-icon.list {
      color: ${({ layoutType, theme }) =>
        layoutType === "list" ? theme["@primary-color"] : "gray"};
    }
  }
  .paginaiton-block {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 50px;

    button {
      background-color: ${({ theme }) => theme["@primary-color"]};
      color: white;
      padding-left: 25px;
      padding-right: 25px;
      transition: 0.2s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme["@primary-color"]} !important;
        color: white !important;
      }
    }
  }
`;
