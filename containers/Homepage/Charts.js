import React from 'react'
import { List } from 'antd';

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



function Charts() {
    return (
        <React.Fragment>
          
        <List
        size="small"
        className="list-charts"
        header={<div className="title">Bảng xếp hạng team quí 3</div>}
        footer={<div>xem thêm</div>}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>
            <img src={item.logo} alt="logo" />
            <div>
                <div className="name">{item.name}</div>
                <div className="skill-rp">
                    <div>{item.skill}</div>
                    <div>{item.RP}</div>
                </div>
            </div>
            <div>1890 (*)</div>
        </List.Item>}
      />
        </React.Fragment>    )
}

export default Charts
