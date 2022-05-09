import { useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { categories } from "../../utils/categories";
import { formatCurrencyToPtBR } from "../../utils/formatters";

import { HistoryCard } from "../../components/HistoryCard";
import { DataListProps } from "../Dashboard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

interface HistoryProps {
  key: string;
  amount: number;
  formattedAmount: string;
  name: string;
  percent: string;
  color: string;
}

export function Resume() {
  const [outcomeHistory, setOutcomeHistory] = useState<HistoryProps[]>([]);

  async function loadTotalOutcome() {
    const dataKey = "@gofinances:transactions";
    const data = await AsyncStorage.getItem(dataKey);
    const formattedData = data ? (JSON.parse(data) as DataListProps[]) : [];

    const outcomes = formattedData.filter(
      (item: DataListProps) => item.type === "down"
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
  }

  useEffect(() => {
    loadTotalOutcome();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
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
    </Container>
  );
}
