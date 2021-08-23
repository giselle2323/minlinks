import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  console.log(user);
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <UserProvider user={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
    
  )
}

export default MyApp
