import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type THEME_TYPE = typeof theme;

  export interface DefaultTheme extends THEME_TYPE {}
}
