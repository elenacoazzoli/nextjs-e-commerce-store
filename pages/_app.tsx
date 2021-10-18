import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { CookieType } from '../util/cookies';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800;900&family=Work+Sans:wght@200;300;400;600&display=swap');

*{
  box-sizing: border-box;

}

body{
  background-color:#faf7f6;
  font-feature-settings:'tnum';
  font-variant-numeric: tabular-nums;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [totalCart, setTotalCart] = useState(0);

  function getAllCookies() {
    const getCookiesFunction = Cookies.get('shoppingcart');
    const cookies = getCookiesFunction ? JSON.parse(getCookiesFunction) : [];
    if (cookies.length > 0) {
      setTotalCart(
        cookies.reduce(
          (sum: number, cookie: CookieType) =>
            cookie.quantity > 0 ? sum + cookie.quantity : sum,
          0,
        ),
      );
    }
  }
  useEffect(() => {
    getAllCookies();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Component
        cartItemsNumber={totalCart}
        updateCartItemsNumber={setTotalCart}
        {...pageProps}
      />
    </>
  );
}
export default MyApp;
