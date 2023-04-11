import { Gist } from "../../hooks/useGists/useGists.interface";
import { ViewType } from "../GistView/GistView.interface";

export interface GistViewHeaderProps {
  gist: Gist;
  viewType?: ViewType;
}
