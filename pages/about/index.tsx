import Head from 'next/head';
import Layout from '../../components/Layout';

interface AboutProps {
  cartItemsNumber: number;
}

function About({ cartItemsNumber }: AboutProps) {
  return (
    <Layout cartItemsNumber={cartItemsNumber}>
      <Head>
        <title>About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <span>about page</span>
    </Layout>
  );
}

export default About;
