import React from 'react'
import { List } from 'antd';
import styled from 'styled-components'
import Iconstars from './image/stars-24px.png'
const data = [
    {
        logo:'https://picsum.photos/48/48',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        skill:140,
        RP:140,
        poin:1890
    },
    {
        logo:'https://picsum.photos/48/48',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        skill:140,
        RP:140,
        poin:1890
    },
    {
        logo:'https://picsum.photos/48/48',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        skill:140,
        RP:140,
        poin:1890
    },
    {
        logo:'https://picsum.photos/48/48',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        skill:140,
        RP:140,
        poin:1890
    },
    {
        logo:'https://picsum.photos/48/48',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        skill:140,
        RP:140,
        poin:1890
    },
  ];

const CustomList= styled(List)`
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 8px;
    background-color:white;
    .title {
    color: #595959;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    }
    .btn-readmore{
        cursor: pointer;

        .triangle-down {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 5.5px solid transparent;
            border-right: 5.5px solid transparent;
            border-top: 6.65px solid #BFBFBF;
        }
    }
  
    ul{
        li{
            justify-content: flex-start;
            border-bottom: unset;
            .logo-team{
                margin-right:16px;
                border-radius: 8px;
                min-width:48px;
                min-height:48px;
                background-color:#E5E5E5;
            }
            .name {
                display: block;
                display: -webkit-box;
                max-width: 200px;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #000000;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
            }
            .kill-rp{
                display:flex;
                div{
                    font-size: 14px;
                    line-height: 22px;
                    display: flex;
                    align-items: center;
                    color: #595959;
                    margin-right:23px;
                }
            }
            .point{
                font-weight: 600;
                font-size: 20px;
                line-height: 28px;
                color: #000000;
            }
         
        }
    }


`

function Charts(props) {
    const {className} =props
    return (
        <div className={className}>

        <CustomList
        size="small"
    
        header={<div className="title">Bảng xếp hạng team quí 3</div>}
        footer={<div className="btn-readmore"> <span className="triangle-down"></span> xem thêm</div>}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>
            <img src={item.logo} className="logo-team" alt="logo" />
            <div>
                <div className="name">{item.name}</div>
                <div className="kill-rp">
                    <div>Kill: {item.skill}</div>
                    <div>RP: {item.RP}</div>
                </div>
            </div>
            <div className="point">1890 <img src={Iconstars} alt="Iconstars" /></div>
        </List.Item>}
      />
        </div>    )
}

export default Charts
