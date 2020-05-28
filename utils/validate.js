import isString from 'lodash/isString';

export const isPhoneNumber = (phone) => {
  if (isString(phone)) {
    const regex = /^(0[98753])[0-9]{8}$/g;
    return regex.test(phone);
  }
  return false;
};

export const isUsername = (username) => {
  if (isString(username)) {
    const regex = /^[a-zA-Z0-9]+([_.]?[a-zA-Z0-9])*$/g;
    return regex.test(username);
  }
  return false;
};

export const isEmail = (email) => {
  if (isString(email)) {
    const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  return false;
};

export const isFacebookLink = (url) => {
  if (isString(url)) {
    const regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;
    return regex.test(url);
  }
  return false;
};

// TODO: remove this unuse function
export function detectLoginType(loginType) {
  if (isPhoneNumber(loginType)) {
    return 'phone';
  } else if (isUsername(loginType)) {
    // eslint-disable-line
    return 'username';
  } else if (isEmail(loginType)) {
    return 'email';
  }
  return '';
}

export function isValidUsername(username) {
  return isPhoneNumber(username) || isUsername(username) || isEmail(username);
}
