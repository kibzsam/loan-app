import { Noop, useController } from "react-hook-form";
import { TextInput } from "react-native";

type InputProps = {
  placeholder?: string;
  onChange?: any;
  value: any;
};
export const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <TextInput
      className="h-[3.5rem] rounded-lg border border-[#B1B1B1] p-4"
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
};
