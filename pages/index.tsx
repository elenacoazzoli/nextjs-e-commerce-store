import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Layout from '../components/Layout';

// const ImageStyled = styled(Image)``;

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
    </Layout>
  );
};

export default Home;
