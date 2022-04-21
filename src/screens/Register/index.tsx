import { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState<string>();
  const [categorySelectOpen, setCategorySelectOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });

  function handleTransactionTypeSelect(type: string) {
    setTransactionType(type);
  }

  function handleCloseCategorySelect() {
    setCategorySelectOpen(false);
  }

  function handleOpenCategorySelect() {
    setCategorySelectOpen(true);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              isActive={transactionType === "up"}
              onPress={() => handleTransactionTypeSelect("up")}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              isActive={transactionType === "down"}
              onPress={() => handleTransactionTypeSelect("down")}
            />
          </TransactionTypes>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenCategorySelect}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categorySelectOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          setCloseCategorySelect={handleCloseCategorySelect}
        />
      </Modal>
    </Container>
  );
}
