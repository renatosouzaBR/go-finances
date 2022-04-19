import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput`
  width: 100%;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  padding: 0 ${RFValue(18)}px;
  margin-bottom: ${RFValue(8)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
