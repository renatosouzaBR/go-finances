import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;
  padding: 13px 20px;
  margin-bottom: 8px;

  border-radius: 5px;
  border-left-width: ${RFValue(4)}px;
  border-left-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
