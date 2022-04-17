import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserProfile,
  UserPhoto,
  UserGreetings,
  Greeting,
  UserName,
  ExitIcon,
  UserWrapper,
  HighlightCards,
  Transactions,
  TransactionTitle,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      type: "income",
      date: "13/04/2020",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
    },
    {
      id: "2",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      type: "outcome",
      date: "10/04/2020",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
    },
    {
      id: "3",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      type: "outcome",
      date: "27/03/2020",
      category: {
        icon: "shopping-cart",
        name: "Casa",
      },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserProfile>
            <UserPhoto
              source={{
                uri: "https://avatars.githubusercontent.com/u/28769727?v=4",
              }}
            />

            <UserGreetings>
              <Greeting>Olá,</Greeting>
              <UserName>Renato</UserName>
            </UserGreetings>
          </UserProfile>

          <ExitIcon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <TransactionTitle>Listagem</TransactionTitle>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
