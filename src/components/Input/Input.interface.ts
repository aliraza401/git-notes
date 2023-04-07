import { Control } from "react-hook-form";

export interface InputProps {
  name: string;
  control: Control;
  rules?: any;
  placeholder?: string
}
