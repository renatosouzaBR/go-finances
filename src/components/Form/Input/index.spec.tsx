import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../global/styles/theme";

import { Input } from ".";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input Component", () => {
  it("should have a border bottom when input is actived", () => {
    const { getByTestId } = render(
      <Input testID="input-email" placeholder="E-mail" active />,
      { wrapper: Providers }
    );

    const inputEmail = getByTestId("input-email");

    expect(inputEmail.props.style[0].borderBottomColor).toBe(
      theme.colors.attention
    );
    expect(inputEmail.props.style[0].borderBottomWidth).toBe(3);
  });
});
