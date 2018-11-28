import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

// tslint:disable-next-line:interface-name
export interface IThemeInterface {
  primaryColor: string;
}

export default styled;
export { styled, css, injectGlobal, keyframes, ThemeProvider };

export interface Styled {
  className: string;
}
