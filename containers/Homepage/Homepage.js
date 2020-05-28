import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';
import { baseUrl } from 'configs/baseUrls';
import CarouselHome from './Carousel'
import styled from 'styled-components'
// import 'styles/pages/homepage.scss';

const CustomCarousel = styled.div`
  display:grid;
  grid-template-columns:600px auto;
  grid-column-gap:20px;
  
`

const Homepage = () => {
  const router = useRouter();
  const { authRequired, option } = router.query;
  const showPopupAuth = authRequired == 'true';
  const [showAuthRequired, setShowAuthRequired] = useState(showPopupAuth);

  useEffect(() => {
    setShowAuthRequired(showPopupAuth);
  }, [showPopupAuth]);

  return (
    <>
      <CustomCarousel className='home-banner'>
          <CarouselHome/>
          <div>asdas</div>
      </CustomCarousel>

      <div className='article'>
        <h1>
          <span>Tứ Hải Giai Huynh Đệ</span>
          <span>Chơi Game là phải có Anh Em!</span>
        </h1>
        <div className='article-content'>
          <div className='head-line'>{'Tạo Bang - Nhập Hội ngay để...'}</div>
          <ul>
            <li>
              <span className='fun-ic ic-check'></span>
              {'Gặp gỡ, giao lưu, quy tụ hảo hữu toàn hệ thống'}
            </li>
            <li>
              <span className='fun-ic ic-check'></span>
              {'Tham gia giải đấu'}
            </li>
            <li>
              <span className='fun-ic ic-check'></span>
              {'Hệ thống quà sôi nổi'}
            </li>
            <li>
              <span className='fun-ic ic-check'></span>
              {'Hỗ trợ Offline'}
            </li>
            <li>
              <span className='fun-ic ic-check'></span>
              {'Ngập tràn quà tặng, ưu đãi khác'}
            </li>
          </ul>
          <div className='head-line bottom'>{'Click Tạo bang hoặc Gia nhập bang bên dưới để nhận nhiều quyền lợi.'}</div>
          <div className='article-alert'>{'ĐỪNG BỎ LỠ!'}</div>
        </div>
      </div>
      <div className='guild-nav'>
        <Link href='/guilds/create'>
          <a className='create-guild'>
            <span className='fun-ic ic-white-star'></span>
            {'Tạo bang'}
          </a>
        </Link>
        <Link href='/guilds/join'>
          <a className='request-join-guild'>
            <span className='fun-ic ic-request-active'></span>
            {'Gia nhập bang'}
          </a>
        </Link>
      </div>
      <div className='company-intro'>
        <div className='company-logo'>
          <img src='/bang-hoi/statics/images/funtap-info.svg' alt='' />
        </div>
        <div className='intro-detail'>
          <p>Email: Hotro@funtap.vn | Hotline: 1900 636 452</p>
          <p>Giấy phép G1 số: 201/GP-BTTTT ngày 14/5/2018 </p>
          <p>Chịu trách nhiệm nội dung: Ông Nguyễn Quang Thịnh</p>
          <p>Copyright © 2020 Funtap.</p>
        </div>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showAuthRequired}
        overlayClassName='modal-overlay'
        className='modal-auth-required-content modal-content on-bottom'
        contentLabel='onRequestClose Example'
        onRequestClose={() => {
          setShowAuthRequired(false);
          router.push('/');
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='model-wrap'>
          <p class='txt-dk'>Đăng nhập / Đăng ký ngay để trải nghiệm các giftcode hấp dẫn dành riêng cho bạn.</p>
          <a
            href={`https://id.funtap.vn/login?response_type=code&reditectTo=${baseUrl}${option ? `&option=${option}` : ''}`}
            class='fun-btn redirect-to-login'
          >
            Đăng nhập FunID
          </a>
          <div class='txt-register'>
            Bạn chưa có tài khoản?{' '}
            <a href={`https://id.funtap.vn/register`} target='_blank'>
              <b>Đăng ký ngay</b>
            </a>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Homepage;
