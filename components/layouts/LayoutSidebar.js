import React,{useState} from 'react'

import Head from 'next/head';
import Link from 'components/LinkMaster';
import Nav from 'components/navigations/Nav';
import Sidebar from 'components/navigations/Sidebar';
import { useRouter } from 'next/router';
import { Layout, Menu,Affix } from 'antd';
import IntroGame from 'components/Intro'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const LayoutSidebar = ({ children, title = 'Playfun - Bang hội', history })=> {
    const [collapsed,setCollapsed] = useState(true)
    const toggle = () => {
        setCollapsed(!collapsed)
    };
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
        <Affix>
            <Sider style={{minHeight: '30vh'}} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
        </Affix>
        
        <Layout className="site-layout">
            <IntroGame/>
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header> */}
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
     
    );
}

export default LayoutSidebar
