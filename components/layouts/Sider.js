import React,{useState} from 'react'
import { Layout, Menu,Affix } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {actionOpenModal} from 'actions/modalAction';
const { Sider } = Layout;
import {

    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
  import UserInfo from './UserInfo'
function SideBar(props) {
    const dispatch = useDispatch();
    const [collapsed,setCollapsed] = useState(true)
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const openModal = () => dispatch(actionOpenModal())
    return (
        <Affix>
            <Sider style={{minHeight: '30vh'}} trigger={null} collapsible collapsed={true}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3" onClick={openModal} icon={<UploadOutlined />}>
                        đang nhập
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UploadOutlined />}>
                      <UserInfo/>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Affix>
    )
}

export default SideBar
