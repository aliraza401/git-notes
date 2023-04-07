import React from "react";

import styled from "styled-components";
import { ContainerProps } from "./Container.interface";

const getStyledContainerWidth = (themeScreen: string) => {
  switch (themeScreen) {
    case "xs":
      return "310px";
    case "sm":
      return "700px";
    case "md":
      return "730px";
    case "lg":
      return "1040px";
    case "xl":
      return "1300px";
    case "2xl":
      return "1340px";
    default:
      return "100%";
  }
};

export const StyledContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  width: ${({ theme }) => getStyledContainerWidth(theme.screen)};
`;

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <StyledContainer style={style} className={"container"}>
      {children}
    </StyledContainer>
  );
};
