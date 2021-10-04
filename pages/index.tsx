import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Layout from '../components/Layout';

const ImageStyled = styled(Image)``;
const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Pastabilities</title>
        <meta
          name="description"
          content="Your shop for endless pasta possibilities"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span>home page</span>
    </Layout>
  );
};

export default Home;
