import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { compose } from 'recompose';
import DefaulLayout from 'components/layouts/DefaultLayout';
import LayoutSidebar from 'components/layouts/LayoutSidebar';
import { loadUserWithSSO, logout } from 'actions/authActions';
import { initGTM } from 'utils/analytics';
// TODO: have better way to get token from cookie?
import withAuthSync from 'hocs/withAuthSync';
import createStore from '../store';
// TODO: move import styles in each component
import 'styles/styles.scss';
import 'styles/nav.scss';
// import 'styles/pages/homepage.scss';
import 'styles/pages/guild.scss';
import 'antd/dist/antd.css'
class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};
  //   const { isServer, accessToken, authorizationCode, store } = ctx;

  //   if (ctx.asPath == '/logout') {
  //     await removeTokenFromCookie(ctx);
  //     await store.dispatch(logout());
  //     redirectToHome(ctx.res);
  //   }

  //   if (isServer && (accessToken || authorizationCode)) {
  //     const { token, user, jwtToken, error } = await authWithSSO(authorizationCode, accessToken);
  //     if (error) {
  //       await removeTokenFromCookie(ctx);
  //       await store.dispatch(logout());
  //       redirectToHome(ctx.res);
  //     } else {
  //       if (!accessToken) {
  //         await setTokenToCookie(ctx, token);
  //       }

  //       await store.dispatch(loadUserWithSSO(token, user, jwtToken));
  //     }
  //   }

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps({ ctx });
  //   }

  //   return { pageProps };
  // }

  // componentDidMount() {
  //   if (!window.GTM_INITIALIZED) {
  //     initGTM();
  //     window.GTM_INITIALIZED = true;
  //   }
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <LayoutSidebar>
          <Component {...pageProps} />
        </LayoutSidebar>
      </Provider>
    );
  }
}

export default compose(withRedux(createStore), withReduxSaga, withAuthSync)(MyApp);
