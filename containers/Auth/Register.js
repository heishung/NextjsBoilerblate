import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { Collapse } from 'react-collapse';
import FacebookLogin from 'react-facebook-login';
import { loginFB, register } from 'actions/authActions';
import { authSelector } from 'reducers/selectors';

import { isEmail, isUsername } from 'utils/validate';
import { FB_APPID, FB_APP_VERSION, FB_APP_LOCALE } from 'configs/facebook';
import {
  REGISTER_USERNAME_EMPTY_ERROR,
  REGISTER_USERNAME_INVALID_ERROR,
  REGISTER_EMAIL_EMPTY_ERROR,
  REGISTER_EMAIL_INVALID_ERROR,
  REGISTER_PASSWORD_EMPTY_ERROR,
  REGISTER_PASSWORD_INVALID_LENGTH_ERROR,
  REGISTER_PASSWORD_INVALID_LOWER_UPPER_CASE_ERROR,
  REGISTER_PASSWORD_INVALID_NUMBER_ERROR
} from 'utils/constants';
// import 'styles/pages/auth.scss';

const Register = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector(authSelector);
  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { username, email, password } = formData;
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: {
      empty: '',
      isStrongPassword: {
        hasValidLength: {
          isValid: true,
          message: REGISTER_PASSWORD_INVALID_LENGTH_ERROR
        },
        hasLowercaseAndUppercase: {
          isValid: true,
          message: REGISTER_PASSWORD_INVALID_LOWER_UPPER_CASE_ERROR
        },
        hasNumber: {
          isValid: true,
          message: REGISTER_PASSWORD_INVALID_NUMBER_ERROR
        }
      }
    }
  });

  const handleChange = e => {
    validateNewValue(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateUsername = value => {
    const _value = value.trim();
    if (!_value) {
      return REGISTER_USERNAME_EMPTY_ERROR;
    }
    if (!isUsername(value)) {
      return REGISTER_USERNAME_INVALID_ERROR;
    }
    return '';
  };

  const validateEmail = value => {
    const _value = value.trim();
    if (!_value) {
      return REGISTER_EMAIL_EMPTY_ERROR;
    }
    if (!isEmail(value)) {
      return REGISTER_EMAIL_INVALID_ERROR;
    }
    return '';
  };

  const validatePassword = password => {
    const hasLowercaseAndUppercase = new RegExp('^(((?=.*[a-z])(?=.*[A-Z])))');
    const hasNumber = new RegExp('^(((?=.*[0-9])))');

    return {
      ...formErrors.password,
      empty: !password ? REGISTER_PASSWORD_EMPTY_ERROR : '',
      isStrongPassword: {
        hasValidLength: {
          ...formErrors.password.isStrongPassword.hasValidLength,
          isValid: password.length >= 6 && password.length <= 15
        },
        hasLowercaseAndUppercase: {
          ...formErrors.password.isStrongPassword.hasLowercaseAndUppercase,
          isValid: hasLowercaseAndUppercase.test(password)
        },
        hasNumber: {
          ...formErrors.password.isStrongPassword.hasNumber,
          isValid: hasNumber.test(password)
        }
      }
    };
  };

  const validateNewValue = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'username':
        error = validateUsername(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const isValidForm = () => {
    let isValidForm = true;

    const emailError = validateEmail(email);
    if (emailError != '') {
      isValidForm = false;
    }

    const usernameError = validateUsername(username);
    if (usernameError != '') {
      isValidForm = false;
    }

    const passwordErrors = validatePassword(password);
    if (
      passwordErrors.empty != '' ||
      Object.values(passwordErrors.isStrongPassword).some(error => !error.isValid)
    ) {
      isValidForm = false;
    }

    setFormErrors({ ...formErrors, email: emailError, username: usernameError, password: passwordErrors });

    return isValidForm;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (isValidForm()) {
      dispatch(register.request(email, username, password));
    }
  };

  const handleLoginFB = callback => {
    if (callback.accessToken) {
      dispatch(loginFB(callback.accessToken));
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký | Funtap</title>
      </Head>
      <div className='auth-form'>
 
        <form onSubmit={e => handleSubmit(e)} className='fun-form' id='funtap-guild-login-form'>
          <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => handleChange(e)}
            />
            {formErrors.email && (
              <div className='alert-error'>
                <span>{formErrors.email}</span>
              </div>
            )}
          </div>
          <div className={`form-group ${formErrors.username ? 'has-error' : ''}`}>
            <input
              type='text'
              placeholder='Tên đăng nhập'
              name='username'
              value={username}
              onChange={e => handleChange(e)}
            />
            {formErrors.username && (
              <div className='alert-error'>
                <span>{formErrors.username}</span>
              </div>
            )}
          </div>
          <div className={`form-group ${formErrors.password.empty ? 'has-error' : ''}`}>
            <input
              type={hidePassword ? 'password' : 'text'}
              placeholder='Mật khẩu'
              name='password'
              value={password}
              onChange={e => handleChange(e)}
            />
            {formErrors.password.empty && (
              <div className='alert-error'>
                <span>{formErrors.password.empty}</span>
              </div>
            )}
            <div
              role='presentation'
              className={hidePassword ? 'icon_eye_close' : 'icon_eye'}
              style={{ cursor: 'pointer' }}
              onClick={() => setHidePassword(!hidePassword)}
            />
            <Collapse
              isOpened={
                formErrors.password.empty == '' &&
                Object.values(formErrors.password.isStrongPassword).some(error => !error.isValid)
              }
            >
              <div className='form-mk'>
                <p className='rs form-mk-p'>
                  <span />
                  Mật khẩu của bạn cần có:
                </p>
                <ul className='rs'>
                  {Object.values(formErrors.password.isStrongPassword).map(error => {
                    return (
                      <li key={error.message} className={error.isValid ? 'done' : 'error'}>
                        {error.message}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Collapse>
          </div>
          {errors && (
            <div className='alert-error'>
              {errors.map((error, key) => (
                <span key={key}>{error}</span>
              ))}
            </div>
          )}
          <div className='form-group'>
            <button id='funtap-register-guild-submit' type='submit' className='fun-btn submit-btn'>
              {'Đăng ký'}
            </button>
          </div>
          <div className='form-group'>
            <FacebookLogin
              appId={FB_APPID}
              version={FB_APP_VERSION}
              language={FB_APP_LOCALE}
              xfbml
              isMobile={false}
              cssClass='fun-btn fb-btn'
              textButton='Đăng ký bằng Facebook'
              scope='public_profile,email'
              callback={handleLoginFB}
              // icon={<img src='/bang-hoi/statics/images/facebook.svg' />}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
