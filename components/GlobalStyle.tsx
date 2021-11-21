import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`

* {
  box-sizing: border-box;

}

body {
  background-color:#faf7f6;
  font-feature-settings:'tnum';
  font-variant-numeric: tabular-nums;
}
`;

export default globalStyle;
