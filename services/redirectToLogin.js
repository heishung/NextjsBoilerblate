import Router from 'next/router';

export const redirectToLogin = (server, redirectPath) => {
  const login = `/?authRequired=true&option=${redirectPath}`;
  // const login = `https://id.funtap.vn/login?response_type=code&reditectTo=${redirectUrl}&option=${redirectPath}`;
  if (server) {
    // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    // server rendered pages need to do a server redirect
    server.writeHead(302, {
      Location: login,
    });
    server.end();
  } else {
    // only client side pages have access to next/router
    Router.push(login);
    // window.location.href = login;
  }
};
