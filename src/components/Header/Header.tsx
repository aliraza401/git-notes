import React from "react";
import LogoImg from "./../../assets/imgs/logo.png";

import { HeaderProps } from "./Header.interface";
import { Avatar, Button, Image, Input, Layout, Space, Dropdown } from "antd";
import { Container } from "../Container";
import { Link } from "react-router-dom";
import { UserContextObject } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { paths } from "./../../constants/paths";
import { GistContextObject } from "../../context/GistContext";
import { StyledHeader } from "./Header.styled";

const { Search } = Input;

export const Header: React.FC<HeaderProps> = () => {
  const { user, logOut, token } = React.useContext(UserContextObject);
  const { paginationState, setPaginationState } =
    React.useContext(GistContextObject);
  const navigate = useNavigate();

  const debouncedSearchGists = debounce(setPaginationState, 300);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) debouncedSearchGists({ ...paginationState, query: value });
  };

  const items = [
    {
      key: "0",
      label: <span onClick={() => navigate("/gist-editor")}>Create Gist</span>,
    },
    {
      key: "1",
      label: (
        <span onClick={() => navigate(paths.URL_USER_PROFILE)}>
          View profile
        </span>
      ),
    },
    {
      key: "2",
      label: <span onClick={() => logOut()}>Logout</span>,
    },
  ];

  return (
    <>
      <StyledHeader>
        <Container>
          <Link to={paths.URL_HOME}>
            <Image className="logo" src={LogoImg} width={150} preview={false} />
          </Link>
          <Space>
            <Search
              placeholder="Search Notes..."
              allowClear
              loading={false}
              onChange={onSearchChange}
            />
            {user && token ? (
              <>
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  className="cursor-pointer"
                >
                  <Avatar src={user.avatar_url} />
                </Dropdown>
              </>
            ) : (
              <Link to={paths.URL_LOGIN}>
                <Button>Login</Button>
              </Link>
            )}
          </Space>
        </Container>
      </StyledHeader>
    </>
  );
};
