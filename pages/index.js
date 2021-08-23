// import { useUser } from '@auth0/nextjs-auth0';
import Link from "next/dist/client/link"
export default function Home() {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user) {
  //   return (
  //     <div>
  //       Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* <a href="/auth/login">Login</a> */}
      <p>Landing</p>
      {/* <Link href="/api/auth/login">Login</Link> */}
    
    </div>
    
  ) 
}
