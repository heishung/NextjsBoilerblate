import { baseUrl } from 'configs/baseUrls';

export const redirectToLogout = (server) => {
  const logout = `https://id.funtap.vn/oauth/logout?next=https://${baseUrl}/logout`;
  if (server) {
    // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    // server rendered pages need to do a server redirect
    server.writeHead(302, {
      Location: logout,
    });
    server.end();
  } else {
    // only client side pages have access to next/router
    // Router.push(login);
    window.location.href = logout;
  }
};
