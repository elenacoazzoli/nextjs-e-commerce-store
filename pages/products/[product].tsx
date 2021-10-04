import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import PastaItem from '../../components/PastaItem';
import PastaProdDescription from '../../components/PastaProdDescription';
import { pastaType } from '../../util/database';

interface productProps {
  singlePastaProduct: pastaType;
}

const Product: NextPage<productProps> = ({ singlePastaProduct }) => {
  return (
    <Layout>
      <Head>
        <title>{singlePastaProduct.name}</title>
        <meta name="description" content="Pasta name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PastaProdDescription pasta={singlePastaProduct} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get data from API
  const idFromUrl = context.query.product;
  const { pastas } = await import('../../util/database');
  const singlePastaProduct = pastas.find((pasta) => {
    return pasta.id.toString() === idFromUrl;
  });

  return {
    props: {
      singlePastaProduct,
    },
  };
};

export default Product;
