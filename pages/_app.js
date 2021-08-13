import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import { SidebarProvider } from './context/SidebarContext';
import ThemedSuspense from '../components/ThemedSuspense';
import { Windmill } from '@windmill/react-ui'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SidebarProvider>
        <ThemedSuspense fallback={<ThemedSuspense />}>
          <Windmill usePreferences>
            <Component {...pageProps} />
          </Windmill>
        </ThemedSuspense>
      </SidebarProvider>
      
    </UserProvider>
    
  )
}

export default MyApp
