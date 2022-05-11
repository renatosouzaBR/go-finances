import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import { Category } from ".";

interface CategoryItemProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: ${RFValue(112)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: ${RFValue(18)}px;
`;

export const CategoryList = styled(
  FlatList as new (props: FlatListProps<Category>) => FlatList<Category>
)`
  flex: 1;
`;

export const CategoryItem = styled.TouchableOpacity<CategoryItemProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;

  padding: ${RFValue(14)}px ${RFValue(16)}px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CategoryIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};

  margin-right: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  padding: 24px;
`;
