import React from 'react'
import { Breadcrumb } from 'antd';
import ContentIntro from './ContentIntro'
import styled from 'styled-components'
import Link from 'components/LinkMaster';


function index() {
    return (
        <div className="ContainerIntro">
             <Breadcrumb separator=">">
                <Breadcrumb.Item><Link href='/'>Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
            <ContentIntro/>
        </div>
    )
}

export default index
