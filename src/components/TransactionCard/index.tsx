import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface TransactionProps {
  type: "up" | "down";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionProps;
}

export function TransactionCard(props: TransactionCardProps) {
  const { name, amount, date, type } = props.data;

  const [category] = categories.filter(
    (item) => item.key === props.data.category
  );

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "down" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
