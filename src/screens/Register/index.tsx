import { useState } from "react";
import { Modal, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
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

interface FormData {
  name: string;
  amount: string;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatorio"),
  amount: Yup.number()
    .typeError("O valor deve ser númerico")
    .positive("O valor não pode ser negativo")
    .required("O preço é obrigatorio"),
});

export function Register() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [transactionType, setTransactionType] = useState<string>();
  const [categorySelectOpen, setCategorySelectOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
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

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
        icon: "any",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount?.message}
            />

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
              testID="category-button"
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categorySelectOpen} testID="category-modal">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            setCloseCategorySelect={handleCloseCategorySelect}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
