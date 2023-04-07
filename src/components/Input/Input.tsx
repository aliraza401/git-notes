import React from "react";
import { Controller } from "react-hook-form";

import { InputProps as InputComponentProps } from "./Input.interface";
import { ErrorMessage, StyledInput } from "./Input.styled";

export const Input: React.FC<InputComponentProps> = ({
  name,
  control,
  rules,
  placeholder,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <StyledInput {...inputProps} {...field} placeholder={placeholder} />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
};
