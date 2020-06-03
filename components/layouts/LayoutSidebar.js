import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head';
// import Link from 'components/LinkMaster';
// import Nav from 'components/navigations/Nav';
// import Sidebar from 'components/navigations/Sidebar';
// import { useRouter } from 'next/router';
import { Layout } from 'antd';
import IntroGame from 'components/Intro';
import ModalGlobal from 'components/Modal';
import SideBar from './sider'
import styled from 'styled-components'
const { Content } = Layout;
const CustomContent = styled(Content)`
  background-color:#E5E5E5!important;
  padding:0px 24px 0px 24px;
`

const LayoutSidebar = ({ children, title = 'Playfun - Bang hội', history })=> {
    return (
    < >
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
        <Layout id='app'>
            <SideBar/>
            <ModalGlobal/>
           
            <CustomContent
              className="site-layout-background"
            >
               <IntroGame/>
              {children}
            </CustomContent>
      </Layout>
    </>
     
    );
}

export default LayoutSidebar
