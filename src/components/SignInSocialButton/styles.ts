import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;

  border-radius: 5px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: ${RFValue(16)}px;
`;

export const ImageWrapper = styled.View`
  height: 100%;
  padding: 0 ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  flex: 1;
  text-align: center;
`;
