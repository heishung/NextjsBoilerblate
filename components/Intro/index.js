import React from 'react'
import { Breadcrumb } from 'antd';
import ContentIntro from './ContentIntro'
import styled from 'styled-components'

const ContainerIntro = styled.div`
    
`
function index() {
    return (
        <ContainerIntro>
             <Breadcrumb separator=">">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
            <ContentIntro/>
        </ContainerIntro>
    )
}

export default index
