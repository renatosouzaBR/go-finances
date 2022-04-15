import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Ammount,
  LastTransaction,
} from "./styles";

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard(props: HighlightCardProps) {
  const { title, amount, lastTransaction, type } = props;

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icons[type]} type={type} />
      </Header>

      <Footer>
        <Ammount type={type}>{amount}</Ammount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
