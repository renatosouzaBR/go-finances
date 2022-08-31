import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputProps extends TextInputProps {
  active?: boolean;
}

export function Input(props: InputProps) {
  const { active = false, ...rest } = props;
  return <Container active={active} {...rest} />;
}
