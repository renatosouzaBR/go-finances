import { useCallback, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { format, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { categories } from "../../utils/categories";
import { formatCurrencyToPtBR } from "../../utils/formatters";

import { HistoryCard } from "../../components/HistoryCard";
import { DataListProps } from "../Dashboard";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelectContainer,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  Loading,
} from "./styles";

interface HistoryProps {
  key: string;
  amount: number;
  formattedAmount: string;
  name: string;
  percent: string;
  color: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [outcomeHistory, setOutcomeHistory] = useState<HistoryProps[]>([]);

  async function loadTotalOutcome() {
    try {
      setIsLoading(true);
      const dataKey = "@gofinances:transactions";
      const data = await AsyncStorage.getItem(dataKey);
      const formattedData = data ? (JSON.parse(data) as DataListProps[]) : [];

      const outcomes = formattedData.filter(
        (item: DataListProps) =>
          item.type === "down" &&
          new Date(item.date).getMonth() === selectedDate.getMonth() &&
          new Date(item.date).getFullYear() === selectedDate.getFullYear()
      );

      const outcomeTotal = outcomes.reduce(
        (acumullator: number, outcome: DataListProps) => {
          return acumullator + Number(outcome.amount);
        },
        0
      );

      const totalBycategory: HistoryProps[] = [];

      categories.forEach((category) => {
        let categorySum = 0;

        outcomes.forEach((item: DataListProps) => {
          if (item.category === category.key) {
            categorySum += Number(item.amount);
          }
        });

        if (categorySum > 0) {
          const percent = `${((categorySum / outcomeTotal) * 100).toFixed(0)}%`;

          totalBycategory.push({
            key: category.key,
            name: category.name,
            amount: categorySum,
            formattedAmount: formatCurrencyToPtBR(categorySum),
            color: category.color,
            percent,
          });
        }
      });

      setOutcomeHistory(totalBycategory);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDateChange(type: "next" | "previous") {
    if (type === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTotalOutcome();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content>
          <MonthSelectContainer>
            <MonthSelectButton onPress={() => handleDateChange("previous")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelectContainer>

          <ChartContainer>
            <VictoryPie
              data={outcomeHistory}
              x="percent"
              y="amount"
              colorScale={outcomeHistory.map((outcome) => outcome.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: "#FFFFFF",
                },
              }}
              labelRadius={50}
            />
          </ChartContainer>

          {outcomeHistory.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.formattedAmount}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
