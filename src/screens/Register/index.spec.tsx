import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import { Register } from ".";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
);

describe("Register screen", () => {
  it("should be open category modal when user click on the category button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("category-modal");
    const categoryButton = getByTestId("category-button");
    fireEvent.press(categoryButton);

    await waitFor(
      () => {
        expect(categoryModal.props.visible).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });
});
