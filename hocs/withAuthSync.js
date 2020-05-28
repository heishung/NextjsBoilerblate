import React, { Component } from 'react';
import cookies from 'next-cookies';

import { accessTokenKey } from 'configs/cookies';

/**
 * HOC get accessToken
 * @param {*} WrappedComponent
 */
const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static async getInitialProps(props) {
      const allCookies = cookies(props.ctx);
      const accessToken = allCookies[accessTokenKey];
      const authorizationCode = props.ctx.query.code;

      props.ctx.authorizationCode = authorizationCode; // eslint-disable-line
      props.ctx.accessToken = accessToken; // eslint-disable-line
      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(props));

      return { ...componentProps, accessToken };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthSync;
