import { Control, RegisterOptions } from "react-hook-form";

export interface InputProps {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  placeholder?: string;
}
