import Cookie from 'js-cookie';

import { accessTokenKey } from 'configs/cookies';

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('singletonEnforcer');

class Authentication {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Constructor không được phép gọi trực tiếp, hãy dùng "Authentication.instance"');
    }

    this.token = null;
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Authentication(singletonEnforcer);
    }
    return this[singleton];
  }

  /**
   * Get token
   * @returns {*|null}
   */
  getToken() {
    if (!this.token) {
      const token = Cookie.get(accessTokenKey);
      if (token) {
        this.token = token;
      }
    }
    return this.token;
  }

  /**
   * Save token cookie
   * @param token
   */
  saveAuthToCookie(token) {
    Cookie.set(accessTokenKey, token, { expires: 90 }); // 3 months
    this.token = token;
  }

  logout() {
    Cookie.remove(accessTokenKey);
    this.token = null;
    if (process.browser) {
      window.location.reload();
    }
  }
}

export default Authentication.instance;
