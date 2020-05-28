import Router from 'next/router';

export const redirectToHome = server => {
  const home = '/?redirected=true';
  if (server) {
    // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    // server rendered pages need to do a server redirect
    server.writeHead(302, {
      Location: home
    });
    server.end();
  } else {
    // only client side pages have access to next/router
    Router.push(home);
  }
};
