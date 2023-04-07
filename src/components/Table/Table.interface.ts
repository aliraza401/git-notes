import { Gist } from "../../hooks/useGists/useGists.interface";

export interface TableProps {
  gists: Gist[];
  isLoading: boolean;
  gristClicked?: (id: string) => void;
}
