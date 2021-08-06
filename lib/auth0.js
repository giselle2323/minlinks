// import { initAuth0 } from '@auth0/nextjs-auth0';

// export default initAuth0({
//   secret: "4d954540bc882ceee42df4d7a5b7ba8c2b7a9f421e73c2b041e80b603a4262d5",
//   issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   routes: {
//     callback:
//       process.env.NEXT_PUBLIC_REDIRECT_URI ||
//       'http://localhost:3000/api/callback',
//     postLogoutRedirect:
//       process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI ||
//       'http://localhost:3000',
//   },
//   authorizationParams: {
//     response_type: 'code',
//     scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
//   },
//   session: {
//     absoluteDuration: process.env.SESSION_COOKIE_LIFETIME,
//   },
// })