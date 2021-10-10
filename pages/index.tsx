import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import BackgroundImage from '../public/images/homebackground.jpg';

// const ImageStyled = styled(Image)``;

// const ImageContainer = styled.div`
//   position: relative;
//   width: 90%;
//   margin-left: 64px;
//   margin-right: 64px;
// `;

// const LinkToProductsContainer = styled.div`
//   background-color: #faf7f6;
//   position: absolute;
//   right: 4%;
//   top: 25%;
//   width: 60%;
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   font-family: 'Playfair Display', serif;
//   font-weight: 900;
//   font-size: 3rem;
//   text-align: left;
//   margin: 8px 16px;
// `;

// const PageDescription = styled.p`
//   font-family: 'Work Sans', sans-serif;
//   font-weight: 200;
//   font-size: 1rem;
//   margin: 8px 16px;
// `;

// const GoToProductsLink = styled.a`
//   background-color: #e49c23;
//   border: 2px solid transparent;
//   text-decoration: underline 2px solid transparent;
//   transition: 0.5s;
//   text-align: center;
//   border-color: #e49c23;
//   color: #fff;
//   font-family: 'Work Sans', sans-serif;

//   margin: 16px 16px;
//   padding: 8px 12px 6px;
//   cursor: pointer;
//   :hover {
//     text-decoration: underline 2px solid #fff;
//   }
// `;

interface HomeProps {
  cartItemsNumber: number;
}

const Home: NextPage<HomeProps> = ({ cartItemsNumber }) => {
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
      <span>home page</span>
      {/* <ImageContainer>
        <ImageStyled src={BackgroundImage} />
        <LinkToProductsContainer>
          <Title>Discover a world of pastabilities.</Title>
          <PageDescription>
            The highest quality pasta with minimal processing.
          </PageDescription>
          <Link href="/products" passHref>
            <GoToProductsLink>DISCOVER OUR PRODUCTS</GoToProductsLink>
          </Link>
        </LinkToProductsContainer>
      </ImageContainer> */}
    </Layout>
  );
};

export default Home;
