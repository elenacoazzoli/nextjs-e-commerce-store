import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800;900&family=Work+Sans:wght@200;300;400&display=swap');
*{
  box-sizing: border-box;

}


body{
  background-color:#faf7f6;
  font-family:Verdana;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
