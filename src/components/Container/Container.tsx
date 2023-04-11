import React from "react";

import styled from "styled-components";
import { ContainerProps } from "./Container.interface";
import { getStyledContainerWidth } from "../../utils/utils";

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
