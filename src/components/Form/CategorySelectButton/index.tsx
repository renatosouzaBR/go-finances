import { TouchableOpacityProps } from "react-native";
import { Container, CategoryName, Icon } from "./styles";

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string;
}

export function CategorySelectButton(props: CategorySelectButtonProps) {
  const { title, ...rest } = props;

  return (
    <Container activeOpacity={0.7} {...rest}>
      <CategoryName>{title}</CategoryName>
      <Icon name="chevron-down" />
    </Container>
  );
}
