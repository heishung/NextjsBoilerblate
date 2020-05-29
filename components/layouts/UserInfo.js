import React, { useState } from 'react';
import Link from 'components/LinkMaster';
import ReactModal from 'react-modal';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { authSelector } from 'reducers/selectors';

const UserInfo = () => {
  const { isAuthenticated, user } = useSelector(authSelector);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(!showModal);
    redirectToLogout();
  };
  console.log(user)
  return (
    <>
      <div className='box-auth'>
        {isAuthenticated ? (
          <>
            <div
              className='wrapper'
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <Avatar round name={user.user_name} size='32' textSizeRatio={32 / 15} style={{ cursor: 'pointer' }} />
              <span className='one-line-ellipsis'>{user.user_name}</span>
              <div className='icon-wrapper'>
                <span className='fun-ic ic-more-horizontal'></span>
              </div>
            </div>
            <ReactModal
              ariaHideApp={false}
              isOpen={showModal}
              overlayClassName='modal-overlay'
              className='modal-user-content modal-content'
              contentLabel='onRequestClose Example'
              onRequestClose={() => {
                setShowModal(!showModal);
              }}
              shouldCloseOnOverlayClick={true}
            >
              <div className='model-wrap'>
                <div className='user-info'>
                  <Avatar round name={user.username} size='32' textSizeRatio={32 / 15} />
                  <span className='username'>{user.username}</span>|<span className='user-id'>ID: {user.id}</span>
                </div>
                <button>
                  <a href='https://id.funtap.vn/dashboard' target='_blank' role='presentation' style={{ cursor: 'pointer' }}>
                    {'Cài đặt tài khoản FunID'}
                  </a>
                </button>
                <button>
                  <a role='presentation' style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    {'Đăng xuất'}
                  </a>
                </button>
              </div>
            </ReactModal>
          </>
        ) : (
          <Link href='/?authRequired=true'>
            <a role='presentation' className='login-btn'>
              <img src='/bang-hoi/statics/images/icon-user.svg' alt='' />
            </a>
          </Link>
        )}
      </div>
    </>
  );
};

export default UserInfo;
