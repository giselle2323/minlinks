import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { Hydrate } from "react-query/hydration";
import { UserProvider } from "@auth0/nextjs-auth0";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { user } = pageProps;
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <UserProvider user={user}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
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
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
