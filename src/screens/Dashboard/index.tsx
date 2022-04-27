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
  Loading,
} from "./styles";

export interface DataListProps extends TransactionProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  income: HighlightProps;
  outcome: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function formatCurrencyToPtBR(currency: Number) {
    return currency.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const data = await AsyncStorage.getItem(dataKey);
    const JSONData = data ? JSON.parse(data) : [];

    let income = 0;
    let outcome = 0;

    const formattedData: DataListProps[] = JSONData.map(
      (item: DataListProps) => {
        if (item.type === "up") {
          income += Number(item.amount);
        } else {
          outcome += Number(item.amount);
        }

        const amount = formatCurrencyToPtBR(Number(item.amount));

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

    setTransactions(formattedData);
    setHighlightData({
      income: {
        amount: formatCurrencyToPtBR(Number(income)),
      },
      outcome: {
        amount: formatCurrencyToPtBR(Number(outcome)),
      },
      total: {
        amount: formatCurrencyToPtBR(income - outcome),
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  if (isLoading) return <Loading />;

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
          amount={highlightData.income.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <TransactionTitle>Listagem</TransactionTitle>

        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
