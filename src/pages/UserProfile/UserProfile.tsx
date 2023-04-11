import React from "react";
import { UserProfileProps } from "./UserProfile.interface";

import { UserContextObject } from "../../context/UserContext";
import { Container } from "../../components/Container/Container";
import { Avatar, Button, Col, Divider, Row, Skeleton, Typography } from "antd";
import { GistContextObject } from "../../context/GistContext";
import { GistView } from "../../components/GistView/GistView";
import { ViewType } from "../../components/GistView/GistView.interface";
import { StyleUserProfile } from "./UserProfile.styled";
const { Title } = Typography;

export const UserProfile: React.FC<UserProfileProps> = () => {
  const { user } = React.useContext(UserContextObject);
  const { fetchUserGists, userGists, loading } =
    React.useContext(GistContextObject);

  React.useEffect(() => {
    fetchUserGists({ username: user?.login, per_page: 100, page: 1 });

    return () => fetchUserGists({ username: "", per_page: 100, page: 1 });
  }, []);

  return (
    <Container>
      <StyleUserProfile>
        <Row gutter={[32, 32]}>
          <Col span={8} className="sidebar">
            <div className="header-sticky">
              <Avatar src={user?.avatar_url} className="user-avatar" />
              <Title level={2}>{user?.name}</Title>
              <a
                target={"_blank"}
                href={user?.html_url || "#"}
                rel="noopener noreferrer"
              >
                <Button>View Github Profile</Button>
              </a>
            </div>
          </Col>
          <Col span={16} className="vertical-divider">
            {userGists.length === 0 ? (
              <Skeleton paragraph={{ rows: 15 }} />
            ) : (
              userGists?.map((gist) => (
                <GistView
                  gist={gist}
                  key={gist.id}
                  viewType={ViewType.userProfile}
                />
              ))
            )}
          </Col>
        </Row>
      </StyleUserProfile>
    </Container>
  );
};
