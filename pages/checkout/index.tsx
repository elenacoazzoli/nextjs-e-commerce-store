import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { sumAllPrices } from '../../util/cartSum';
import { CookieType } from '../../util/cookies';
import { getPastasInCookies, PastaType } from '../../util/database';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 80px;
`;

const CheckoutTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  color: #2f3b4d;
  font-size: 2.5rem;
  margin-top: 4px;
  padding: 0 32px;
`;

const ShippingAndBillingHeadings = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  text-align: left;
  width: 60%;
  color: #2f3b4d;
  font-size: 2rem;
  margin-top: 16px;
  padding: 0 0 0 0;
`;

const LabelsAndInputsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  margin-top: 12px;
`;

const LabelStyled = styled.label`
  display: block;
  margin: 0 0 4px 4px;
  font-size: 1rem;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
`;
const InputStyled = styled.input`
  width: 100%;
  height: 32px;
  width: 70%;

  padding: 4px 8px;
  border: 2px solid #2f3b4d;
  border-radius: 8px;
  font-size: 1rem;

  &::placeholder {
    font-family: 'Work Sans', sans-serif;
    font-size: 1rem;
  }
`;

const GoingBackLink = styled.a`
  background-color: #faf7f6;
  border: 2px solid;
  text-align: center;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  border-color: #2f3b4d;
  color: #5c5c5c;
  font-family: 'Work Sans', sans-serif;
  width: 240px;
  margin-top: 24px;
  padding: 8px 12px 6px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #2f3b4d;
  }
`;

const ConfirmButton = styled.button`
  background-color: #2f3b4d;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  border-color: #2f3b4d;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  font-size: 1rem;
  width: 240px;
  margin-top: 24px;
  padding: 8px 12px 6px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #fff;
  }
`;

interface CheckOutProps {
  shoppingCart: PastaType[];
  cartItemsNumber: number;
  updateCartItemsNumber: Dispatch<SetStateAction<number>>;
}

function Checkout({
  cartItemsNumber,
  shoppingCart,
  updateCartItemsNumber,
}: CheckOutProps) {
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  // sum prices of items in cart
  const sumPrices = (array: PastaType[]) => {
    setSubTotal(sumAllPrices(array));
  };

  const checkoutClickHandler = () => {
    // delete cookies
    Cookies.remove('shoppingcart');
    // update header cart number
    updateCartItemsNumber(0);
    // redirect to payment success page
    router.push('/purchasesuccess');
  };

  useEffect(() => {
    sumPrices(shoppingCart);
  });

  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Your shop for endless pasta possibilities"
        />
        <link rel="icon" href="/farfalle.png" />
      </Head>

      <FormContainer>
        <CheckoutTitle>
          Finalise your order of €{subTotal.toFixed(2)}
        </CheckoutTitle>
        <ShippingAndBillingHeadings>
          Billing and delivery details
        </ShippingAndBillingHeadings>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="FirstName">First Name</LabelStyled>
          <InputStyled id="FirstName" placeholder="John" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="LastName">Last Name</LabelStyled>
          <InputStyled id="LastName" placeholder="Doe" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="Address">Street and house number</LabelStyled>
          <InputStyled id="Address" placeholder="Address" />
        </LabelsAndInputsContainer>

        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="City">City</LabelStyled>
          <InputStyled id="City" placeholder="Vienna" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="PostCode">Postal code</LabelStyled>
          <InputStyled id="PostCode" placeholder="1100" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="id">Country</LabelStyled>
          <InputStyled id="id" placeholder="Austria" />
        </LabelsAndInputsContainer>
        <ShippingAndBillingHeadings>Payment details</ShippingAndBillingHeadings>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="id">Credit card </LabelStyled>
          <InputStyled id="id" placeholder="Credit card number" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="id">Expiration date</LabelStyled>
          <InputStyled id="id" placeholder="MM/YY" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <LabelStyled htmlFor="id">CVV</LabelStyled>
          <InputStyled id="id" placeholder="Security code" />
        </LabelsAndInputsContainer>
        <LabelsAndInputsContainer>
          <Link href="/cart" passHref>
            <GoingBackLink> {`< Return to shopping cart`}</GoingBackLink>
          </Link>
          <ConfirmButton onClick={checkoutClickHandler}>
            CONFIRM ORDER
          </ConfirmButton>
        </LabelsAndInputsContainer>
      </FormContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get cookies information from context on server side and parse them
  const cartCookies = context.req.cookies.shoppingcart || '[]';
  const shoppingCart = JSON.parse(cartCookies);

  // get array of ids of cookies
  const shoppingCartIds = shoppingCart.map((cookie: CookieType) => cookie.id);

  // get data from db
  const pastasInCookies = await getPastasInCookies(shoppingCartIds);

  // if in the cookie there is an object with the same id as pasta then create new object with quantity plus the pasta product info
  const finalCartCookie = shoppingCart.map((cookie: CookieType) => ({
    ...cookie,
    ...pastasInCookies.find((pasta) => pasta.id === cookie.id),
  }));

  return {
    props: {
      shoppingCart: finalCartCookie,
    },
  };
};

export default Checkout;
