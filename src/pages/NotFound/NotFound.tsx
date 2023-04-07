import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../constants/paths";
import { NotFoundProps } from "./NotFound.interface";
import { StylednotFound } from "./NotFound.styled";

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <StylednotFound>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={paths.URL_HOME}>
            <Button>Back Home</Button>
          </Link>
        }
      />
    </StylednotFound>
  );
};
