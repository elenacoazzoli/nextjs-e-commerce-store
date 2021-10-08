import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { cookieType } from '../util/cookies';
import { pastasType, pastaType } from '../util/database';

// creating interface to pass the parsed cookies to the cart components
// probably I have to create the "data type" of the object shopping cart with key id and property

interface CookiesProps {
  shoppingCart: pastaType[];
  cartItemsNumber: number;
}
const Cart: NextPage<CookiesProps> = ({ shoppingCart, cartItemsNumber }) => {
  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>Your cart</title>
        <meta name="description" content="Current shopping cart" />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <p> Shopping cart</p>
      {shoppingCart.length === 0 ? (
        <p>Your shopping cart is empty!</p>
      ) : (
        <div>
          {shoppingCart.map((cartProduct: pastaType) => {
            return (
              <div key={cartProduct.id}>
                <p>Product: {cartProduct.name}</p>
                <p>Quantity: {cartProduct.quantity}</p>
                <p>Unit price: € {cartProduct.price} </p>
              </div>
            );
          })}
        </div>
      )}

      <button>Continue shopping</button>
      <button>Checkout</button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // afterwards: get data from API
  const { pastas } = await import('../util/database');

  // get cookies information from context on server side and parse them
  const cartCookies = context.req.cookies.shoppingcart || '[]';
  const shoppingCart = JSON.parse(cartCookies);

  // if in the cookie there is an object with the same id as pasta then create new object with the pasta product info
  const finalCartCookie = shoppingCart.map((cookie: pastaType) => ({
    ...cookie,
    ...pastas.find((pasta) => pasta.id === cookie.id),
  }));

  return {
    props: {
      shoppingCart: finalCartCookie,
    },
  };
};

export default Cart;
