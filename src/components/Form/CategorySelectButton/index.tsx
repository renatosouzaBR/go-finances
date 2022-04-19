import { Container, CategoryName, Icon } from "./styles";

export function CategorySelectButton() {
  return (
    <Container>
      <CategoryName>Categoria</CategoryName>
      <Icon name="chevron-down" />
    </Container>
  );
}
