import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider } from "next-themes";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";

// import "../styles/index.css";

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
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              icon={false}
            />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
