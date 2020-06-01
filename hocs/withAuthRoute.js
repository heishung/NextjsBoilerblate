import React, { Component } from 'react';

/**
 * HOC auth route
 * @param {*} WrappedComponent
 */
const withAuthRoute = WrappedComponent =>
  class extends Component {
    static async getInitialProps(props) {
      const { ctx } = props;
      if (ctx.accessToken) {
        redirectToHome(ctx.res);
      }
      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(props));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthRoute;
