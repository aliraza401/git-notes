import { Gist } from "../../hooks/useGists/useGists.interface";

export enum ViewType {
  compact = "compact",
  detail = "detail",
  userProfile = "userProfile",
}

export interface GistViewProps {
  gist: Gist;
  isLoading?: boolean;
  viewType?: ViewType;
  gistClicked?: (id: string) => void;
}

export interface StyledGistViewProps {
  viewType?: ViewType;
}
