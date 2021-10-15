import Cookies from 'js-cookie';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { CookieType } from '../util/cookies';
import { getPastasInCookies, PastaType } from '../util/database';

const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 32px;
  margin-bottom: 32px;
  color: #5c5c5c;
`;

const ProductRowInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ShoppingCartTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  color: #2f3b4d;
  font-size: 2.5rem;
  margin-top: 4px;
  padding: 0 32px;
`;

const TableHeadText = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 32px;
  width: 25%;
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: #e35c5c;
  border-color: #e35c5c;
  border: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 1rem;
  padding: 4px 10px 4px 10px;
  cursor: pointer;
`;

const StandardText = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  font-size: 1rem;
  margin-top: 32px;
  padding: 0 32px;
  width: 25%;
`;

const SubTotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 32px 0 32px;
  background-color: #2f3b4d;
`;

const SubTotal = styled.span`
  background-color: #2f3b4d;
  border: 1px solid transparent;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 6px 48px;
`;
const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px;
  margin-top: 16px;
`;
const CheckoutLink = styled.a`
  background-color: #2f3b4d;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  border-color: #2f3b4d;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  width: 240px;
  margin-top: 16px;
  padding: 8px 12px 6px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #fff;
  }
`;
const ContinueLink = styled.a`
  background-color: #faf7f6;
  border: 2px solid;
  text-align: center;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  border-color: #2f3b4d;
  color: #5c5c5c;
  font-family: 'Work Sans', sans-serif;
  width: 240px;
  margin-top: 16px;
  padding: 8px 12px 6px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #2f3b4d;
  }
`;

interface CookiesProps {
  shoppingCart: PastaType[];
  cartItemsNumber: number;
  updateCartItemsNumber: Dispatch<SetStateAction<number>>;
  cookies: CookieType[];
}
function Cart({
  shoppingCart,
  cartItemsNumber,
  updateCartItemsNumber,
  cookies,
}: CookiesProps) {
  const [subTotal, setSubTotal] = useState(0);
  const [updatedShoppingCart, setUpdatedShoppingCart] = useState(shoppingCart);
  const [isCartEmpty, setIsCartEmpty] = useState(shoppingCart.length === 0);

  // sum prices of items in cart
  const sumPrices = (array: PastaType[]) => {
    array = updatedShoppingCart;
    const summedPrices = array.reduce(
      (sum: number, pasta: PastaType) =>
        pasta.quantity && pasta.quantity > 0
          ? sum + pasta.quantity * pasta.price
          : sum,
      0,
    );

    setSubTotal(Math.round(summedPrices + Number.EPSILON) / 100);
  };

  const deleteClickHandler = (id: number) => {
    // store deleted Item
    const deletedCartItem = updatedShoppingCart.find(
      (cartItem) => cartItem.id === id,
    );
    console.log(deletedCartItem);

    if (deletedCartItem) {
      // update the shoppingcart array
      const filteredShoppingCart = updatedShoppingCart.filter(
        (cartItem) => cartItem.id !== id,
      );
      setUpdatedShoppingCart(filteredShoppingCart);
      setIsCartEmpty(filteredShoppingCart.length === 0);
      console.log(updatedShoppingCart);

      // update cookies
      const cookieIndex = cookies.findIndex(
        (cookie: CookieType) => cookie.id === deletedCartItem.id,
      );
      cookies.splice(cookieIndex, 1);
      Cookies.set('shoppingcart', JSON.stringify(cookies));

      // update cart items sum
      updateCartItemsNumber(
        cookies.reduce(
          (sum: number, cookie: CookieType) =>
            cookie.quantity > 0 ? sum + cookie.quantity : sum,
          0,
        ),
      );
    }
  };

  useEffect(() => {
    sumPrices(shoppingCart);
  });

  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>Your cart</title>
        <meta name="description" content="Current shopping cart" />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <ShoppingCartTitle> Shopping cart</ShoppingCartTitle>
      {isCartEmpty ? (
        <StandardText>Your shopping cart is empty!</StandardText>
      ) : (
        <>
          <CartInfoContainer>
            <ProductRowInfoContainer>
              <TableHeadText>Product</TableHeadText>
              <TableHeadText>Quantity</TableHeadText>
              <TableHeadText>Unit price</TableHeadText>
              <TableHeadText>Total</TableHeadText>
            </ProductRowInfoContainer>
            {updatedShoppingCart.map((cartProduct: PastaType) => {
              return cartProduct.quantity && cartProduct.quantity > 0 ? (
                <ProductRowInfoContainer key={cartProduct.id}>
                  <StandardText>
                    <DeleteButton
                      onClick={() => deleteClickHandler(cartProduct.id)}
                    >
                      x
                    </DeleteButton>
                    <StandardText>{cartProduct.name}</StandardText>
                  </StandardText>
                  <StandardText>{cartProduct.quantity}</StandardText>
                  <StandardText>
                    €{(cartProduct.price / 100).toFixed(2)}
                  </StandardText>
                  <StandardText>
                    €
                    {((cartProduct.price * cartProduct.quantity) / 100).toFixed(
                      2,
                    )}
                  </StandardText>
                </ProductRowInfoContainer>
              ) : null;
            })}
          </CartInfoContainer>
          <SubTotalContainer>
            <SubTotal>Sub-Total: €{subTotal.toFixed(2)}</SubTotal>
          </SubTotalContainer>
        </>
      )}

      <ActionsContainer>
        <Link href="/products" passHref>
          <ContinueLink>CONTINUE SHOPPING</ContinueLink>
        </Link>
        {!isCartEmpty && <CheckoutLink>CHECKOUT</CheckoutLink>}
      </ActionsContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get cookies information from context on server side and parse them
  const cartCookies = context.req.cookies.shoppingcart || '[]';
  const shoppingCart = JSON.parse(cartCookies);
  console.log(shoppingCart);

  // get array of ids of cookies
  const shoppingCartIds = shoppingCart.map((cookie: CookieType) => cookie.id);
  console.log(shoppingCartIds);

  // get data from db
  const pastasInCookies = await getPastasInCookies(shoppingCartIds);
  console.log(pastasInCookies);

  // if in the cookie there is an object with the same id as pasta then create new object with quantity plus the pasta product info
  const finalCartCookie = shoppingCart.map((cookie: CookieType) => ({
    ...cookie,
    ...pastasInCookies.find((pasta) => pasta.id === cookie.id),
  }));
  console.log(finalCartCookie);

  return {
    props: {
      shoppingCart: finalCartCookie,
      cookies: shoppingCart,
    },
  };
};

export default Cart;
