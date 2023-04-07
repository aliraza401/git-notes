import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React from "react";
import { HomeProps, StyledHomeProps } from "./Home.interface";

import styled from "styled-components";
import { Container } from "../../components/Container";
import { Table } from "../../components/Table";
import useGists from "../../hooks/useGists/useGists";
import { Gist, GistLayout } from "../../hooks/useGists/useGists.interface";
import type { ColumnsType } from "antd/es/table";
import { GistView } from "../../components/GistView";
import { ListRender } from "../../components/ListRender";
import { Button, Col, Pagination, Row, Space } from "antd";

import { GistContextObject } from "./../../context/GistContext";

import { useNavigate } from "react-router-dom";

import { ViewType as GrintViewType } from "./../../components/GistView/GistView.interface";
import { StyledHome } from "./Home.styled";

export const Home: React.FC<HomeProps> = () => {
  const {
    loading,
    gists,
    error: GistsFetchingError,
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

  const inPaginationChange = (page: number) => {
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
            onClick={() => inPaginationChange(paginationState.page + 1)}
          >
            Next Page <ArrowRightOutlined />
          </Button>

          <Pagination
            simple
            defaultCurrent={1}
            current={paginationState.page}
            total={3051}
            onChange={inPaginationChange}
          />
        </div>
      </Container>
    </StyledHome>
  );
};
