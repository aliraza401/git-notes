import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  Divider,
  Space,
  Spin,
  Typography,
  message,
  Skeleton,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  ForkOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

import { UserContextObject } from "../../context/UserContext";
import {
  deleteGist,
  forkGist,
  isGistStarred,
  starGist,
  unStarGist,
} from "../../utils/gistUtils";
import { paths } from "../../constants/paths";
import { fileReader } from "../../utils/fileReader";
import { GistViewProps, ViewType } from "./GistView.interface";
import { StyledGistView } from "./GistView.styled";
const { Meta } = Card;

export const GistView: React.FC<GistViewProps> = React.memo(
  ({
    gist,
    isLoading,
    viewType = ViewType.compact,
    gistClicked = () => {},
  }) => {
    const [content, setContent] = useState("");
    const [isStarred, setIsStarred] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messagePopup, setMessagePopup] = useState<string | boolean>(false);
    const navigate = useNavigate();

    const { user } = useContext(UserContextObject);

    const handleGristCardClick = useCallback(() => {
      if (typeof gist.id === "string") gistClicked(gist.id);
    }, [gist.id, gistClicked]);

    useEffect(() => {
      (async () => {
        const fileUrl = gist.files[Object.keys(gist.files)[0]].raw_url;
        const content = await fileReader({ fileUrl });
        setContent(content);
      })();
    }, [gist.files]);

    useEffect(() => {
      (async () => {
        if (ViewType.compact !== viewType) {
          const result = await isGistStarred(gist.id);
          setIsStarred(result);
        }
      })();
    }, [gist.id, viewType]);

    useEffect(() => {
      if (messagePopup) message.success(messagePopup);
    }, [messagePopup]);

    const setGistStared = useCallback(async () => {
      setLoading(true);
      const result = await starGist(gist.id);
      if (result) setIsStarred(true);
      setMessagePopup("Gist starred successfully");
      setLoading(false);
    }, [gist.id]);

    const setGistUnStared = useCallback(async () => {
      setLoading(true);
      const result = await unStarGist(gist.id);
      if (result) setIsStarred(false);
      setMessagePopup("Gist un-starred successfully");
      setLoading(false);
    }, [gist.id]);

    const onDeleteGist = useCallback(async () => {
      if (typeof gist.id === "string") {
        const result = await deleteGist(gist.id);
        setMessagePopup("Gist deleted");
        if (!!result) navigate(paths.URL_HOME);
      }
    }, [gist.id, navigate]);

    const onForkGist = useCallback(async () => {
      if (typeof gist.id === "string") {
        const result = await forkGist(gist.id);
        if (!!result) setMessagePopup("Gist forked succesfully");
      }
    }, [gist.id]);

    const handleGistDetailViewClick = useCallback(() => {
      if (viewType === ViewType.userProfile)
        navigate(`/gist-detail/${gist.id}`);
    }, [gist.id, navigate, viewType]);

    const memoizedCardContent = useMemo(() => {
      if (isLoading) return <Skeleton />;
      if (content) return <pre>{content}</pre>;
      return null;
    }, [isLoading, content]);

    const memoizedHeaderContent = useMemo(() => {
      if (isLoading) return <Skeleton.Avatar active size={64} />;

      return (
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
      );
    }, [isLoading, gist.owner.avatar_url, gist.owner.login, gist.files]);

    const memoizedIcons = useMemo(() => {
      if (user && user.login !== gist.owner.login) {
        return (
          <ForkOutlined
            onClick={onForkGist}
            style={{ fontSize: "20px", marginRight: "8px" }}
          />
        );
      }
      if (user) {
        return (
          <>
            <Link to={`/gist-editor/${gist.id}`}>
              <EditFilled style={{ fontSize: "20px", marginRight: "8px" }} />
            </Link>
            <DeleteFilled
              onClick={onDeleteGist}
              style={{ fontSize: "20px", marginRight: "8px" }}
            />
            {isStarred ? (
              <StarFilled
                onClick={setGistUnStared}
                disabled={loading}
                style={{ fontSize: "20px" }}
              />
            ) : (
              <StarOutlined
                onClick={setGistStared}
                disabled={loading}
                style={{ fontSize: "20px" }}
              />
            )}
          </>
        );
      }

      return null;
    }, [
      user,
      gist.owner.login,
      gist.id,
      onDeleteGist,
      onForkGist,
      isStarred,
      setGistUnStared,
      setGistStared,
      loading,
    ]);

    return (
      <StyledGistView viewType={viewType}>
        {viewType === ViewType.compact ? (
          <Card
            cover={memoizedCardContent}
            loading={isLoading}
            onClick={handleGristCardClick}
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
              {memoizedHeaderContent}
              <div className="icons">{memoizedIcons}</div>
            </div>

            <div className="body" onClick={handleGistDetailViewClick}>
              <div className="title">
                <Typography>{Object.keys(gist.files)[0]}</Typography>
              </div>
              <div className="detail">
                {content ? (
                  <pre>{content}</pre>
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
