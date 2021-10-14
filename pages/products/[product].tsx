import Cookies from 'js-cookie';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useState } from 'react';
import Layout from '../../components/Layout';
import PastaProdDescription from '../../components/PastaProdDescription';
import { CookieType } from '../../util/cookies';
import { getPasta, PastaType } from '../../util/database';

interface ProductProps {
  singlePastaProduct: PastaType;
  cartItemsNumber: number;
  updateCartItemsNumber: Dispatch<SetStateAction<number>>;
}

function Product({
  singlePastaProduct,
  cartItemsNumber,
  updateCartItemsNumber,
}: ProductProps) {
  const [productQuantity, setProductQuantity] = useState(1);

  const productCountReducer = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const productCountIncrease = () => {
    setProductQuantity(productQuantity + 1);
  };

  const cartClickHandler = () => {
    // when I click on the button I want to create a cookie object that will have the key "id" of the pasta I am adding the value of the input.

    const getCookiesFunction = Cookies.get('shoppingcart');
    const currentCookies = getCookiesFunction
      ? JSON.parse(getCookiesFunction)
      : [];

    // if in the current cookie there is an object with the id of my pasta product -> return true
    const isPastaCookieExisting = currentCookies.some(
      (cookieObject: CookieType) => {
        return cookieObject.id === singlePastaProduct.id; // id that comes from the URL
      },
    );

    let newCookie;
    if (isPastaCookieExisting) {
      const cookieIndex = currentCookies.findIndex(
        (cookie: CookieType) => cookie.id === singlePastaProduct.id,
      );
      // Update object's name property.
      currentCookies[cookieIndex].quantity += productQuantity;

      newCookie = currentCookies;
    } else {
      newCookie = [
        ...currentCookies,
        { id: singlePastaProduct.id, quantity: productQuantity },
      ];
    }

    Cookies.set('shoppingcart', JSON.stringify(newCookie));

    updateCartItemsNumber(
      newCookie.reduce(
        (sum: number, cookie: CookieType) => sum + cookie.quantity,
        0,
      ),
    );
  };

  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>{singlePastaProduct.name}</title>
        <meta name="description" content="Pasta name" />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <PastaProdDescription
        pasta={singlePastaProduct}
        onClick={cartClickHandler}
        productAmount={productQuantity}
        lessAmount={productCountReducer}
        moreAmount={productCountIncrease}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // later: get data from API
  const idFromUrl = Number(context.query.product);
  const singlePastaProduct = await getPasta(idFromUrl);

  return {
    props: {
      singlePastaProduct,
    },
  };
};

export default Product;
