import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  DeleteFilled,
  EditFilled,
  ForkOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

import { UserContextObject } from "../../context/UserContext";
import { GistViewHeaderProps } from "./GistViewHeader.interface";
import { ViewType } from "././../GistView/GistView.interface";
import { GistContextObject } from "../../context/GistContext";

export const GistViewHeader: React.FC<GistViewHeaderProps> = React.memo(
  ({ gist, viewType = ViewType.compact }) => {
    const { user } = useContext(UserContextObject);
    const { onStarGist, onDeleteGist, onForkGist, onUnStarGist, loading } =
      useContext(GistContextObject);

    if (user && user.login !== gist.owner.login) {
      return (
        <ForkOutlined
          onClick={() => onDeleteGist(gist.id)}
          className="icon-base"
        />
      );
    }
    if (user) {
      return (
        <>
          <Link to={`/gist-editor/${gist.id}`}>
            <EditFilled className="icon-base" />
          </Link>
          <DeleteFilled
            onClick={() => onDeleteGist(gist.id)}
            className="icon-base"
          />
          {viewType === ViewType.detail ? (
            gist.isGistStarred ? (
              <StarFilled
                onClick={() => onUnStarGist(gist.id)}
                disabled={loading}
                className="icon-base"
              />
            ) : (
              <StarOutlined
                onClick={() => onStarGist(gist.id)}
                disabled={loading}
                className="icon-base"
              />
            )
          ) : null}
        </>
      );
    }

    return <></>;
  }
);
