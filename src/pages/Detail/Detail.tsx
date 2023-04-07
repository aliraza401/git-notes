import React from "react";
import { DetailProps } from "./Detail.interface";
import styled from "styled-components";
import { Container } from "../../components/Container";
import { GistContextObject } from "./../../context/GistContext";
import { useParams } from "react-router-dom";
import { GistView } from "../../components/GistView";
import { ViewType } from "../../components/GistView/GistView.interface";

const StyledDetail = styled.div``;

export const Detail: React.FC<DetailProps> = () => {
  const { id } = useParams();

  const { gist, setSelectedGist, loading } =
    React.useContext(GistContextObject);

  React.useEffect(() => {
    if (typeof id === "string") {
      setSelectedGist(id);
    }

    return () => setSelectedGist(null);
  }, []);

  return (
    <StyledDetail>
      <Container>
        {gist ? (
          <GistView
            gist={gist}
            viewType={ViewType.detail}
            isLoading={loading}
          />
        ) : null}
      </Container>
    </StyledDetail>
  );
};
