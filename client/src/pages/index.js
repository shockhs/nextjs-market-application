import Head from 'next/head';
import React from 'react';
import { connect } from "react-redux";
import Products from '../components/Products/Products';


const Home = ({ products }) => {
  return (
    <>
      <Head>
        <title>Products Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Products products={products} />
      </main>

      <footer>
      </footer>
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:5000/api/market/')
  const json = await res.json()
  return { products: json }
}

export default connect((state) => state.auth)(Home)