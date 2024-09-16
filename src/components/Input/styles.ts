import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface StyledInputProps extends TextInputProps {
  error?: boolean;
}

export const Container = styled.View`
  margin-bottom: 20px;
  height: 81px;
  padding: 8px;
`;

export const StyledInput = styled.TextInput<StyledInputProps>`
  background-color: ${({error, theme}) => error ? theme.colors.main : theme.colors.line};
  padding: 8px;
  height: 48px;
  border-radius: 4px;
`;