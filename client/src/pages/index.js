import dynamic from "next/dynamic";
import Head from 'next/head';
import React from 'react';
import { connect } from "react-redux";
import Products from '../components/Products/Products';

const LoginPage = dynamic(() => import("./login"));
// more imports here


const Home = ({ products, isAuthenticated, state }) => {
  // const [loggedIn, setLoggedIn] = useState('')
  // useEffect(() => {
  //   async function fetchData() {
  //     const existingTokens = localStorage.getItem("jwt")
  //     setLoggedIn(existingTokens)
  //   }
  //   fetchData();
  // }, [])
  return (
    <>
      <Head>
        <title>ProductsPage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <Products products={products} />
        </div>
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