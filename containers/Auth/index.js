import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'components/LinkMaster';
import Login from './Login'
import Register from './Register'
import { Tabs } from 'antd';
import 'styles/pages/auth.scss';
const { TabPane } = Tabs;
const Index = () => {
const callback = e =>console.log(e)
  return (
    <div id="Container-login-register">
      <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Tab 1" key="1">
                <Login/>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                <Register/>
            </TabPane>
         </Tabs>
    </div>
  );
};

export default Index;
