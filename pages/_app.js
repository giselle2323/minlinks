import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return getLayout(
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
        </Layout>
    </UserProvider>
    
  )
}

export default MyApp
