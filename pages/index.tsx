import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const HomeSectionStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SpaghettiImage = styled.img`
  margin: 0 32px 0 128px;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 -400px 0 35px;
  background-color: #faf7f6;
  padding: 32px 24px 48px 32px;
  z-index: 1;
`;
const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  margin: 0 0 0 0;
`;

const SubTitleStyled = styled.span`
  font-family: 'Work Sans', sans-serif;
  color: #2f3b4d;
  font-weight: 500;
  font-size: 1.5rem;
  margin: 8px 0 0 0;
  box-shadow: inset 0 -8px 0 #f6c570;
`;
const LinkStyled = styled.a`
  background-color: #2f3b4d;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  border-color: #2f3b4d;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  margin-top: 16px;
  padding: 12px 36px;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #f6c570;
  }
`;

interface HomeProps {
  cartItemsNumber: number;
}

function Home({ cartItemsNumber }: HomeProps) {
  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>Pastabilities</title>
        <meta
          name="description"
          content="Your shop for endless pasta possibilities"
        />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <HomeSectionStyled>
        <HeadingContainer>
          <H1Styled>A world of pastabilities</H1Styled>
          <SubTitleStyled>
            The highest quality pasta, made with the best grains
          </SubTitleStyled>
          <Link href="/products" passHref>
            <LinkStyled>GO TO THE SHOP</LinkStyled>
          </Link>
        </HeadingContainer>
        <SpaghettiImage
          src="/images/backgroundimage.jpg"
          width="800px"
          height="500px"
        />
      </HomeSectionStyled>
    </Layout>
  );
}

export default Home;
