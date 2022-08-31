import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  active: boolean;
}

export const Container = styled.TextInput<Props>`
  width: 100%;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  padding: 0 ${RFValue(18)}px;
  margin-bottom: ${RFValue(8)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.colors.attention};
    `}
`;
