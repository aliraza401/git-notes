import React from "react";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useNavigate } from "react-router-dom";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Container } from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";

import { EditGistProps } from "./GistEditor.interface";
import { GistContextObject } from "../../context/GistContext";
import { useParams } from "react-router-dom";
import { StyledEditGist } from "./GistEditor.styled";
import { GistForm } from "../../hooks/useGists/useGists.interface";
import { paths } from "../../constants/paths";
import { getGistFormData } from "./../../utils/utils";

export const GistEditor: React.FC<EditGistProps> = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const { setSelectedGist, gist, createGist, updateGist } =
    React.useContext(GistContextObject);

  React.useEffect(() => {
    if (id && id !== gist?.id) setSelectedGist(id);
  }, []);

  React.useEffect(() => {
    if (gist) {
      setValue("description", gist.description);
      setValue("name", Object.keys(gist.files)[0]);
      setValue("content", gist.content);
    }
  }, [gist]);

  const onSubmit = async (data: FieldValues) => {
    const inputObj: GistForm = getGistFormData(data);
    if (id) {
      inputObj.id = id;
      await updateGist(inputObj);
    } else {
      await createGist(inputObj);
    }
    navigate(paths.URL_USER_PROFILE);
  };

  return (
    <Container>
      <StyledEditGist>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="description"
            placeholder="Enter description"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Input should be at least 2 characters long",
              },
            }}
          />
          <Input
            name="name"
            placeholder="Enter name"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Input should be at least 2 characters long",
              },
            }}
          />
          <Controller
            name="content"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Content should be at least 2 characters long",
              },
            }}
            render={({ field }) => (
              <TextArea rows={10} {...field} placeholder="Enter content" />
            )}
          />

          <Button htmlType="submit">Submit</Button>
        </form>
      </StyledEditGist>
    </Container>
  );
};
