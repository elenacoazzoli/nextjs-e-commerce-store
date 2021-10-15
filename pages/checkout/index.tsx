import Head from 'next/head';

function Checkout() {
  return (
    <>
      <Head>
        <title>Pastabilities</title>
        <meta
          name="description"
          content="Your shop for endless pasta possibilities"
        />
        <link rel="icon" href="/farfalle.png" />
      </Head>
      <div>
        <label htmlFor="id">hola</label>
        <input id="id" placeholder="1234" />
      </div>
    </>
  );
}

export default Checkout;
