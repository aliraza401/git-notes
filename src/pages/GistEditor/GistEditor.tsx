import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";

import { EditGistProps } from "./GistEditor.interface";
import { createGist, updateGist } from "../../utils/gistUtils";
import { useNavigate } from "react-router-dom";
import { GistContextObject } from "../../context/GistContext";
import { useParams } from "react-router-dom";
import { fileReader } from "../../utils/fileReader";
import { StyledEditGist } from "./GistEditor.styled";

export const GistEditor: React.FC<EditGistProps> = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const { id } = useParams();
  const { setSelectedGist, gist } = React.useContext(GistContextObject);

  React.useEffect(() => {
    if (id) setSelectedGist(id);
  }, []);

  React.useEffect(() => {
    (async () => {
      if (gist && id) {
        setValue("description", gist.description);
        const firstFileKey = Object.keys(gist.files)[0];
        setValue("name", firstFileKey);

        const fileUrl = gist.files[firstFileKey].raw_url;
        const content = await fileReader({ fileUrl });
        setValue("content", content);
      }
    })();
  }, [gist, id]);

  const onSubmit = async (data: any) => {
    const inputObj: any = {
      description: data.description,
      public: true,
      files: {
        [data.name]: {
          content: data.content,
        },
      },
    };
    if (id) {
      inputObj.id = id;
      const respData = await updateGist(inputObj);
      if (Object.keys(respData).length) {
        setSelectedGist(null);
        message.success("Gist Edit successfully");
        navigate(`/gist-detail/${id}`);
      }
    } else {
      const respData = await createGist(inputObj);
      message.success("Gist created successfully");
      navigate(`/gist-detail/${respData.id}`);
    }
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
                message: "Input should be at least 5 characters long",
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
                message: "Input should be at least 5 characters long",
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
