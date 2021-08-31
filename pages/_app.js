import React, { useEffect } from "react";
import { themeChange } from "theme-change";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { UserProvider } from "@auth0/nextjs-auth0";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  useEffect(() => {
    themeChange(false);
  }, []);
  const { user } = pageProps;
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <UserProvider user={user}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            pposition="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
