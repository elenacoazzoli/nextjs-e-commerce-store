import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import PastaItem from '../../components/PastaItem';
import {
  CategoryType,
  getCategories,
  getPastas,
  PastasType,
  PastaType,
} from '../../util/database';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsHead = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
  margin: 16px 0 0 0;
`;

const PastaProductsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 64px;
  margin-left: 64px;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 32px 256px 0 256px;
  color: #2f3b4d;
`;

const CategoryFilterButton = styled.button`
  background-color: #faf7f6;
  border-radius: 5px;
  border: 2px solid;
  text-align: center;
  text-decoration: underline 1px solid transparent;
  transition: 0.5s;
  border-color: #2f3b4d;
  color: #2f3b4d;
  font-family: 'Work Sans', sans-serif;
  font-size: 1rem;
  padding: 4px 24px 4px;
  cursor: pointer;
  :hover {
    text-decoration: underline 1px solid #2f3b4d;
  }
`;

interface ProductsProps {
  pastas: PastasType;
  cartItemsNumber: number;
  categories: CategoryType[];
}

function Products({ pastas, cartItemsNumber, categories }: ProductsProps) {
  const [filteredPastaList, setFilteredPastaList] = useState(pastas);
  const showPastasByCategory = (category: string) => {
    setFilteredPastaList(pastas.filter((pasta) => pasta.category === category));
  };
  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>Our products</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <PageContainer>
        <ProductsHead>Our world of pastabilities</ProductsHead>
        <CategoryButtonContainer>
          <CategoryFilterButton onClick={() => setFilteredPastaList(pastas)}>
            ALL PASTAS
          </CategoryFilterButton>
          {categories.map((category: CategoryType) => {
            return (
              <CategoryFilterButton
                key={category.category}
                onClick={() => showPastasByCategory(category.category)}
              >
                {category.category.toUpperCase()}
              </CategoryFilterButton>
            );
          })}
        </CategoryButtonContainer>
        <PastaProductsContainer>
          {filteredPastaList.map((pasta: PastaType) => {
            return <PastaItem pasta={pasta} key={pasta.id} />;
          })}
        </PastaProductsContainer>
      </PageContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // get data from db
  const pastas = await getPastas();
  const categories = await getCategories();
  return {
    props: {
      pastas,
      categories,
    },
  };
};

export default Products;
