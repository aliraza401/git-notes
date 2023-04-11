import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, Divider, Space, Spin, Typography, Skeleton } from "antd";

import { GistViewProps, ViewType } from "./GistView.interface";
import { StyledGistView } from "./GistView.styled";
import { GistViewHeader } from "../GistViewHeader/GistViewHeader";
import { GistContextObject } from "../../context/GistContext";
const { Meta } = Card;

export const GistView: React.FC<GistViewProps> = React.memo(
  ({
    gist,
    isLoading,
    viewType = ViewType.compact,
    gistClicked = () => {},
  }) => {
    const navigate = useNavigate();
    const { loading } = useContext(GistContextObject);

    const handleGistDetailViewClick = useCallback(() => {
      if (viewType === ViewType.userProfile)
        navigate(`/gist-detail/${gist.id}`);
    }, [gist.id, navigate, viewType]);

    return (
      <StyledGistView viewType={viewType}>
        {viewType === ViewType.compact ? (
          <Card
            cover={loading ? <Skeleton /> : <pre>{gist.content}</pre>}
            loading={isLoading}
            onClick={() => gistClicked(gist.id)}
          >
            <Divider />
            <Meta
              avatar={<Avatar src={gist.owner.avatar_url} />}
              title={gist?.owner?.login + " / " + Object.keys(gist.files)[0]}
              description={new Date(gist.created_at).toLocaleDateString()}
            />
          </Card>
        ) : (
          <div className="detailView">
            {isLoading ? <Spin size="large" /> : null}
            <div className="header">
              <Space>
                <Avatar src={gist.owner.avatar_url} size={64} />
                <div>
                  <Typography>
                    {gist?.owner?.login + " / " + Object.keys(gist.files)[0]}
                  </Typography>
                  <Typography>
                    {new Date(gist.created_at).toLocaleDateString()}
                  </Typography>
                </div>
              </Space>
              <div className="icons">
                <GistViewHeader gist={gist} viewType={viewType} />
              </div>
            </div>

            <div className="body" onClick={handleGistDetailViewClick}>
              <div className="title">
                <Typography>{Object.keys(gist.files)[0]}</Typography>
              </div>
              <div className="detail">
                {gist.content ? (
                  <pre>{gist.content}</pre>
                ) : (
                  <Skeleton active paragraph={{ rows: 10 }} />
                )}
              </div>
            </div>
          </div>
        )}
      </StyledGistView>
    );
  }
);
