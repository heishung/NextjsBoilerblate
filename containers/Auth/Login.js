import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'components/LinkMaster';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { authSelector } from 'reducers/selectors';
import { login, loginFB } from 'actions/authActions';

import { FB_APPID, FB_APP_VERSION, FB_APP_LOCALE } from 'configs/facebook';
import Loading from 'components/layouts/Loading';
// import 'styles/pages/auth.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(authSelector);

  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // if (isValidForm()) {
    dispatch(login.request(username, password));
    // }
  };

  const handleLoginFB = callback => {
    if (callback.accessToken) {
      dispatch(loginFB(callback.accessToken));
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập | Funtap Bang Hội</title>
      </Head>
      <div className='auth-form'>
        <div className='form-title'>
          <a className='active'>Đăng nhập</a>
          <Link href='/register'>
            <a role='presentation'>Tạo tài khoản</a>
          </Link>
        </div>
        <form onSubmit={e => handleSubmit(e)} className='form' id='funtap-guild-login-form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Email hoặc số điện thoại'
              name='username'
              value={username}
              onChange={e => handleChange(e)}
            />
            {formErrors.username && (
              <div className='alert_erorr'>
                <span />
                {formErrors.username}
              </div>
            )}
          </div>
          <div className='form-group'>
            <input
              type={hidePassword ? 'password' : 'text'}
              placeholder='Mật khẩu'
              name='password'
              value={password}
              onChange={e => handleChange(e)}
            />
            {formErrors.password && (
              <div className='alert_erorr'>
                <span />
                {formErrors.password}
              </div>
            )}
            <div
              role='presentation'
              className={hidePassword ? 'icon_eye_close' : 'icon_eye'}
              onClick={() => setHidePassword(!hidePassword)}
            />
          </div>
          {/* <a href='https://id.funtap.vn/resetPassword/resetPasswordForm' className='form-qmk'>
            Quên mật khẩu?
          </a> */}
          <div className='form-group'>
            <button id='funtap-login-guild-submit' type='submit' className='fun-btn submit-btn'>
              {'Đăng nhập'}
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
              textButton='Đăng nhập bằng Facebook'
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

export default Login;
