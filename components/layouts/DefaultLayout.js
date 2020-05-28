import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'components/LinkMaster';
import Nav from 'components/navigations/Nav';
import Sidebar from 'components/navigations/Sidebar';
import UserInfo from './UserInfo';
import ToggleDisplay from 'react-toggle-display';
import { useRouter } from 'next/router';

const DefaultLayout = ({ children, title = 'Playfun - Bang hội', history }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = useRouter();
  const isShowHeader = pathname === '/';

  return (
    <>
      <div id='app' className={showMenu ? 'menu-showed' : ''}>
        <Head>
          <title>{title}</title>
          <link rel='icon' href='/banghoi.svg' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />

          <meta property='og:title' key='og_title' content='Bang hội Playfun' />
          <meta property='og:type' key='og_type' content='website' />
          <meta property='og:url' key='og_URL' content='https://banghoi.playfun.vn' />
          <meta
            property='og:image'
            key='og_image'
            content='https://banghoi.playfun.vn/bang-hoi/statics/images/bang-hoi-banner.jpg'
          />
          <meta
            property='og:description'
            key='og_description'
            content='Tứ Hải Giai Huynh Đệ. Chơi Game là phải có Anh Em!'
          />

          <meta name='description' content='Tứ Hải Giai Huynh Đệ. Chơi Game là phải có Anh Em!' />
        </Head>
        <ToggleDisplay show={isShowHeader}>
          <header className='main-header'>
            <nav role='navigation'>
              <div id='menuToggle'>
                <span
                  className='fun-ic ic-navigation-menu'
                  onClick={() => {
                    if (isShowHeader) {
                      setShowMenu(!showMenu);
                    }
                  }}
                ></span>
              </div>
            </nav>
            <div className='logo'>
              <Link href='/'>
                <a>
                  <img src='/bang-hoi/statics/images/bang-hoi-logo.svg' alt='' />
                </a>
              </Link>
            </div>
            <div className='user-info'>
              <UserInfo />
            </div>
          </header>
        </ToggleDisplay>

        <div id='main'>{children}</div>
        <footer className='main-footer'>
          <Nav />
        </footer>
      </div>
      <ToggleDisplay show={isShowHeader}>
        <div className={`menu-overlay ${showMenu ? 'menu-showed' : ''}`}>
          <div className='sidebar-wrap'>
            <Sidebar />
            <div
              className='sidebar-close'
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <span className='fun-ic ic-eclose'></span>
            </div>
          </div>
        </div>
      </ToggleDisplay>
    </>
  );
};

export default DefaultLayout;
