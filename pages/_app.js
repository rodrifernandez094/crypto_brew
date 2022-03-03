import "../styles/globals.css";
import "../firebase/firebase";
import Router from "next/router";
import { useState, useEffect } from "react";
import { AuthProvider } from "../context/authContext";
import Layout from "../components/Layout";
import AuthStateChanged from "../components/AuthStateChanged";
import Spinner from "../components/Spinner";

// function MyApp({ Component, pageProps }) {
//   return (
// <AuthProvider>
//   <AuthStateChanged>
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   </AuthStateChanged>
// </AuthProvider>
//   );
// }

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AuthProvider>
          <AuthStateChanged>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthStateChanged>
        </AuthProvider>
      )}
    </>
  );
}

export default MyApp;
