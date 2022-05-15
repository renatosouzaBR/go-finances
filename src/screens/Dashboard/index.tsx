import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../../hooks/auth";
import { formatCurrencyToPtBR } from "../../utils/formatters";
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
  ExitButton,
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
  lastTransaction: string;
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

  const { user, signOut } = useAuth();

  function getLastDate(date: string, lastDate: number) {
    const time = new Date(date).getTime();
    return time > lastDate ? time : lastDate;
  }

  function formatLongDate(date: Date) {
    const day = date.getDate();
    const longMonth = date.toLocaleString("pt-BR", { month: "long" });
    return `${day} de ${longMonth}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const data = await AsyncStorage.getItem(dataKey);
    const JSONData = data ? JSON.parse(data) : [];

    let income = 0;
    let outcome = 0;
    let lastIncome = 0;
    let lastOutcome = 0;

    const formattedData: DataListProps[] = JSONData.map(
      (item: DataListProps) => {
        if (item.type === "up") {
          income += Number(item.amount);
          lastIncome = getLastDate(item.date, lastIncome);
        } else {
          outcome += Number(item.amount);
          lastOutcome = getLastDate(item.date, lastOutcome);
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
        lastTransaction: formatLongDate(new Date(lastIncome)),
      },
      outcome: {
        amount: formatCurrencyToPtBR(Number(outcome)),
        lastTransaction: formatLongDate(new Date(lastOutcome)),
      },
      total: {
        amount: formatCurrencyToPtBR(income - outcome),
        lastTransaction: `01 à ${formatLongDate(new Date())}`,
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
                uri: user.photo,
              }}
            />

            <UserGreetings>
              <Greeting>Olá,</Greeting>
              <UserName>{user.name}</UserName>
            </UserGreetings>
          </UserProfile>

          <ExitButton onPress={signOut}>
            <ExitIcon name="power" />
          </ExitButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.income.amount}
          lastTransaction={`Última entrada dia ${highlightData.income.lastTransaction}`}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction={`Última saída dia ${highlightData.outcome.lastTransaction}`}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
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
