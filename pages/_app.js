import React from 'react';
import {
  QueryClientProvider, QueryClient
 } from 'react-query'
 import { ReactQueryDevtools } from 'react-query/devtools';
 import { Hydrate } from 'react-query/hydration';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  const { user } = pageProps;
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <UserProvider user={user}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={true} />
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
    
  )
}

export default MyApp
