import {
  ArrowRightOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React from "react";
import { HomeProps } from "./Home.interface";

import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { Gist, GistLayout } from "../../hooks/useGists/useGists.interface";
import { GistView } from "../../components/GistView/GistView";
import { Button, Col, Pagination, Row, Space } from "antd";

import { GistContextObject } from "./../../context/GistContext";

import { useNavigate } from "react-router-dom";

import { ViewType as GrintViewType } from "./../../components/GistView/GistView.interface";
import { StyledHome } from "./Home.styled";

export const Home: React.FC<HomeProps> = () => {
  const {
    loading,
    gists,
    layoutType,
    setLayoutType,
    paginationState,
    setPaginationState,
  } = React.useContext(GistContextObject);

  const navigate = useNavigate();

  const changeLayoutType = (type: GistLayout) => {
    setLayoutType(type);
  };

  const navgateToDetail = (gistId: string) => {
    navigate(`/gist-detail/${gistId}`);
  };

  const onPaginationChange = (page: number) => {
    setPaginationState({
      ...paginationState,
      page: page,
    });
  };

  return (
    <StyledHome layoutType={layoutType}>
      <Container>
        <div className="display-options">
          <TableOutlined
            className="display-icon grid"
            onClick={() => changeLayoutType(GistLayout.grid)}
          />
          <UnorderedListOutlined
            className="display-icon list"
            onClick={() => changeLayoutType(GistLayout.list)}
          />
        </div>
        <div>
          {layoutType === GistLayout.grid ? (
            <>
              <Row gutter={[24, 24]}>
                {gists.map((gist: Gist) => (
                  <Col span={8} key={gist.id}>
                    <GistView
                      isLoading={loading}
                      gist={gist}
                      gistClicked={(id) => navgateToDetail(id)}
                      viewType={GrintViewType.compact}
                    />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Table
              gists={gists}
              isLoading={loading}
              gristClicked={(id) => navgateToDetail(id)}
            />
          )}
        </div>
        <div className="paginaiton-block">
          <div></div>
          <Button
            size="large"
            onClick={() => onPaginationChange(paginationState.page + 1)}
          >
            Next Page <ArrowRightOutlined />
          </Button>

          <Pagination
            simple
            defaultCurrent={1}
            current={paginationState.page}
            total={3051}
            onChange={onPaginationChange}
          />
        </div>
      </Container>
    </StyledHome>
  );
};
