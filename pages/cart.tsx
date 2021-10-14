import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { PastaType } from '../util/database';

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
}
function Cart({ shoppingCart, cartItemsNumber }: CookiesProps) {
  const [subTotal, setSubTotal] = useState(0.0);

  const isCartEmpty = shoppingCart.length === 0;

  const sumPrices = (array: PastaType[]) => {
    array = shoppingCart;
    const summedPrices = array.reduce(
      (sum: number, pasta: PastaType) =>
        pasta.quantity && pasta.quantity > 0
          ? sum + pasta.quantity * pasta.price
          : sum,
      0,
    );

    setSubTotal(Math.round((summedPrices + Number.EPSILON) * 100) / 100);
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
            {shoppingCart.map((cartProduct: PastaType) => {
              return cartProduct.quantity && cartProduct.quantity > 0 ? (
                <ProductRowInfoContainer key={cartProduct.id}>
                  <StandardText>{cartProduct.name}</StandardText>
                  <StandardText>{cartProduct.quantity}</StandardText>
                  <StandardText>€{cartProduct.price.toFixed(2)} </StandardText>
                  <StandardText>
                    €{(cartProduct.price * cartProduct.quantity).toFixed(2)}
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
  // afterwards: get data from API
  const { pastas } = await import('../util/database');

  // get cookies information from context on server side and parse them
  const cartCookies = context.req.cookies.shoppingcart || '[]';
  const shoppingCart = JSON.parse(cartCookies);

  // if in the cookie there is an object with the same id as pasta then create new object with the pasta product info
  const finalCartCookie = shoppingCart.map((cookie: PastaType) => ({
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
