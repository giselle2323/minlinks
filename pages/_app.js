import { Windmill } from '@windmill/react-ui'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Windmill>
        <Component {...pageProps} />
      </Windmill>
    </UserProvider>
    
  )
}

export default MyApp
