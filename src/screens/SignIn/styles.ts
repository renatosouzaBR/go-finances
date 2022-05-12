import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Logo = styled(LogoSvg).attrs({
  width: RFValue(120),
  height: RFValue(68),
})``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;
  margin-top: ${RFValue(40)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;
  margin-top: ${RFValue(80)}px;
`;

export const FooterButtonsWrapper = styled.View`
  margin-top: -${RFPercentage(4)}px;
  padding: 0 ${RFValue(32)}px;
`;
