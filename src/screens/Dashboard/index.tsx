import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const data = await AsyncStorage.getItem(dataKey);
    const JSONData = data ? JSON.parse(data) : [];

    const formattedData: DataListProps[] = JSONData.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          category: item.category,
          type: item.type,
          amount,
          date,
        };
      }
    );

    setData(formattedData);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
