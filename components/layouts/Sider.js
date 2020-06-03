import React,{useState} from 'react'
import { Layout, Menu,Affix } from 'antd';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import {actionOpenModal} from 'actions/modalAction';
import styled from 'styled-components'
import UserInfo from './UserInfo'
import Logo from './image/logo.png'
import Login from './image/Login.png'
import IconMyTournaments from './image/my-tournaments.png'
import IconCup from './image/Icon-cup.png'
const { Sider } = Layout;



const CustomMenu = styled(Menu)`
    width:100%;
    li{
        height:119px!important;
        padding:0px!important;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #8C8C8C;
        img{
            filter: grayscale(1);
        }
        &:hover{
            color: #FA541C;
            img{
                filter: unset;
            }
        }
        &.ant-menu-item-selected{
            background-color: white!important;
            color: #FA541C;
            img{
                filter: unset;
            }
            &:before{
                content: '';
                display: block;
                background: #FA541C;
                border-radius: 0px 8px 8px 0px;
                width: 6px;
                height: 80px;
                position: absolute;
                left: 0px;
                top: 18px;
            }
        }
    }
`

function SideBar(props) {
    const dispatch = useDispatch();
    const [collapsed,setCollapsed] = useState(true)
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const openModal = () => dispatch(actionOpenModal())
    return (
        <Affix >
            <Sider style={{minHeight: '100vh',borderRight:'1px solid #D9D9D9'}} theme={'light'} inlineIndent={0} collapsedWidth={'120'} trigger={null} collapsible collapsed={true}>
                <div className="logo" />
                <CustomMenu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <img className="logo img-fluid"  src={Logo} alt="Logo" />
                    <Menu.Item key="1" onClick={openModal} >
                    <img className="Login img-fluid" src={Login} style={{width:'80px'}} alt="Login" />
                    </Menu.Item>
                    <Menu.Item key="2" >
                    <img className="Login img-fluid" src={IconCup} style={{width:'56px'}} alt="Login" />
                        Giải đấu
                    </Menu.Item>
                
                    <Menu.Item key="3" icon={<img className="Login img-fluid" style={ { width: '56px'}} src={IconMyTournaments} alt="Login" />}>
                        GIẢI ĐẤU CỦA TÔI
                    </Menu.Item>
                </CustomMenu>
            </Sider>
        </Affix>
    )
}

export default SideBar
