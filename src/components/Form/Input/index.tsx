import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return <Container {...props} />;
}
