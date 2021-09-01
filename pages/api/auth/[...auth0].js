import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import logoutHandlerFactory from '@auth0/nextjs-auth0/dist/auth0-session/handlers/logout';

export default handleAuth({
    async login(req, res) {
      await handleLogin(req, res, {
        returnTo: "/dashboard",
      });
    },
    async logout(req,res) {
        await handleLogout(req, res, {
            returnTo: "/"
        })
    }
});
