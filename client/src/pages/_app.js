import dynamic from "next/dynamic";
import React from 'react';
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from '../store/store';
const Header = dynamic(() => import('../components/Header/Header'))


const Layout = ({ children }) => {
  return <>
    <Header />
    <div className="container">
      {children}
    </div>
  </>
}


const App = ({ Component, pageProps }) => {
  const store = useStore((state) => state)
  return (
    <Layout >
      <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
        <Component {...pageProps} />
      </PersistGate>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
        }
        .container { 
          width:1240px;
          margin: 0 auto;
        }
        
        img,li,ul,ol,span,h1,h2,h3,h4,h5,h6,main,footer {
          margin:0;
          padding:0;
        }

        main {
          width:100%
        }

        *,*::before,*::after {
          box-sizing: border-box;
        }
        a,
        button {
          cursor: pointer;
        } 

        a {
          text-decoration:none;
          color:#000
        }
      
        /* montserrat-300 - latin */
        @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 300;
        src: url('../../fonts/montserrat-v14-latin-300.eot'); /* IE9 Compat Modes */
        src: local('Montserrat Light'), local('Montserrat-Light'),
            url('../../fonts/montserrat-v14-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
            url('../../fonts/montserrat-v14-latin-300.woff') format('woff'), /* Modern Browsers */
            url('../../fonts/montserrat-v14-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
            url('../../fonts/montserrat-v14-latin-300.svg#Montserrat') format('svg'); /* Legacy iOS */
        }
        /* montserrat-regular - latin */
        @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400;
        src: url('../../fonts/montserrat-v14-latin-regular.eot'); /* IE9 Compat Modes */
        src: local('Montserrat Regular'), local('Montserrat-Regular'),
            url('../../fonts/montserrat-v14-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
            url('../../fonts/montserrat-v14-latin-regular.woff') format('woff'), /* Modern Browsers */
            url('../../fonts/montserrat-v14-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
            url('../../fonts/montserrat-v14-latin-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
        }
        /* montserrat-500 - latin */
        @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        src: url('../../fonts/montserrat-v14-latin-500.eot'); /* IE9 Compat Modes */
        src: local('Montserrat Medium'), local('Montserrat-Medium'),
            url('../../fonts/montserrat-v14-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
            url('../../fonts/montserrat-v14-latin-500.woff') format('woff'), /* Modern Browsers */
            url('../../fonts/montserrat-v14-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
            url('../../fonts/montserrat-v14-latin-500.svg#Montserrat') format('svg'); /* Legacy iOS */
        }
        /* montserrat-700 - latin */
        @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        src: url('../../fonts/montserrat-v14-latin-700.eot'); /* IE9 Compat Modes */
        src: local('Montserrat Bold'), local('Montserrat-Bold'),
            url('../../fonts/montserrat-v14-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
            url('../../fonts/montserrat-v14-latin-700.woff') format('woff'), /* Modern Browsers */
            url('../../fonts/montserrat-v14-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
            url('../../fonts/montserrat-v14-latin-700.svg#Montserrat') format('svg'); /* Legacy iOS */
        }
      `}</style>
    </Layout>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  // Keep in mind that this will be called twice on server, one for page and second for error page
  ctx.store.dispatch({ type: "APP", payload: "was set in _app" });
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname
    }
  };
};

export default wrapper.withRedux(App);
