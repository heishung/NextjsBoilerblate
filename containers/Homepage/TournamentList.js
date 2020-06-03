import React from 'react'
import styled from 'styled-components'
import Iconcheck from './image/Icon-check.png'
const Title = styled.h3`
    color: #000000;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom:16px;
`
const Tournaments = styled.div`
      border:1px solid #f2f2f2;
      border-radius:12px ;
      background-color:white;
      >div:not(.tournaments-image){
        padding-left: 15px;
        padding-right: 15px;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }
      .tournaments-image{
        border-radius:12px 12px 0px 0px ;
        width: 100%;
        padding: 20%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        margin-bottom: 0px;
      }
      .tournaments-name{
        padding-left: 15px;
        padding-right: 15px;
        margin-top:15px;
        font-size: 20px;
        line-height: 28px;
        color: #000000;
        display: block;
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tournaments-time{
        margin-top:15px;
      }
      .tournaments-line{
          span{
            border-top: 1px solid #E8E8E8;
            width:100%;
            display: inline-block;
          }
      }
      .tournaments-status-countTeam{
          padding-bottom:21px;
          padding-top:25px;
          display:flex;
          justify-content:space-between;
          .tournaments-countTeam{
            color: #8C8C8C;
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
          }
          .tournaments-status{
            color: #595959;
            .triangle-right {
                width: 0;
                height: 0;
                display: inline-block;
                border-top: 5.15px solid transparent;
                border-left: 8.96px solid #595959;
                border-bottom: 5.15px solid transparent;
            }
          }
          
      }
`
const data = [
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:1
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:2
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:3
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:4
    }
  ];

const tournamentsStatus = (status)=>{
    switch(status){
        case 1:
            return <div className="tournaments-status"><span className="triangle-right"></span> <span>Đang diễn ra</span></div>
        case 2:
            return <div className="tournaments-status"><img src={Iconcheck} alt="Iconcheck" /> <span>Đã tham gia</span></div>
        case 3:
            return <div className="tournaments-status"><span className="triangle-right"></span> <span>Tham gia ngay</span></div>
        case 4:
            return <div className="tournaments-status"><span className="triangle-right"></span> <span>Đã kết thúc</span></div>
            
        default:{
            return ''
        }
    }
}
  
const gentData = array =>{
    let result 
    if(array.length > 0){
        result = array.map((d,i)=>
            <Tournaments key={i} className="tournaments">
                <div className="tournaments-image" style={{backgroundImage:`url(${d.logo})`}} />
                <h4 className="tournaments-name">{d.name}</h4>
                <div className="tournaments-time">Thời gian diễn ra:{d.time}</div>
                <div className="tournaments-type">Thể thức:{d.type}</div>
                <div className="tournaments-organization">Đơn vị tổ chức:{d.organization}</div>
                <div className="tournaments-prize">Tổng giải thưởng:{d.prize}</div>
                <div className="tournaments-line" >
                    <span></span>
                </div>
                <div className="tournaments-status-countTeam">
                    <div className="tournaments-countTeam">{d.countTeam} ĐỘI ĐÃ THAM GIA</div>
                    {tournamentsStatus(d.status)}
                </div>
            </Tournaments>
        )
    }
    return result
}


function TournamentList() {
    if(data){
      return  <section className="tour-nament-list">
            <Title>Gải đấu</Title>
            <div className="list-item">
                {gentData(data)}
            </div>
            
        </section>
    }
    return 'loading'
}

export default TournamentList
