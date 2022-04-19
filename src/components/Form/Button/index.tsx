import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button(props: ButtonProps) {
  const { title, ...rest } = props;

  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
