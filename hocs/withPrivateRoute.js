import React, { Component } from 'react';
import { redirectToLogin } from 'services/redirectToLogin';

/**
 * HOC private route
 * @param {*} WrappedComponent
 */
const withPrivateRoute = (WrappedComponent) =>
  class extends Component {
    static async getInitialProps(props) {
      const { ctx } = props;
      if (!ctx.authorizationCode && !ctx.accessToken) {
        redirectToLogin(ctx.res, ctx.asPath.slice(1));
      }
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(props));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withPrivateRoute;
