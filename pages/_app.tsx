import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import GlobalStyle from '../components/GlobalStyle';
import { CookieType } from '../util/cookies';

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
