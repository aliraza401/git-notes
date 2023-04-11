import { FieldValues } from "react-hook-form";
import { GistForm } from "../hooks/useGists/useGists.interface";

export const fetchFile = async (url: string) => {
  const file = await fetch(url);
  return file;
};

export const getStyledContainerWidth = (themeScreen: string) => {
  switch (themeScreen) {
    case "xs":
      return "310px";
    case "sm":
      return "700px";
    case "md":
      return "730px";
    case "lg":
      return "1040px";
    case "xl":
      return "1300px";
    case "2xl":
      return "1340px";
    default:
      return "100%";
  }
};

export const getGistFormData = (data: FieldValues): GistForm => ({
  id: "",
  description: data.description,
  public: true,
  files: {
    [data.name]: {
      content: data.content,
    },
  },
});
