import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryIcon,
  Separator,
  Footer,
} from "./styles";

export type Category = {
  key: string;
  name: string;
  icon: string;
};

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  setCloseCategorySelect: () => void;
}

export function CategorySelect(props: CategorySelectProps) {
  const { category, setCategory, setCloseCategorySelect } = props;

  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <CategoryList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CategoryItem
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <CategoryIcon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={setCloseCategorySelect} />
      </Footer>
    </Container>
  );
}
