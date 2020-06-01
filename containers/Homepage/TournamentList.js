import React from 'react'


const data = [
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:'đang diễn ra'
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:'đang diễn ra'
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:'đang diễn ra'
    },
    {
        logo:'https://picsum.photos/400/400',
        name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut suscipit metus, at venenatis dolor. Morbi pellentesque arcu felis, sit amet ultricies tellus convallis at. Nulla facilisi. Curabitur interdum non risus ullamcorper viverra. Nam vehicula, sapien in suscipit convallis, erat leo molestie orci, sit amet accumsan nibh nulla in massa',
        time:'16h30 - 20/05/2020',
        type: '5vs5',
        organization:'Funmate',
        prize:2000000,
        countTeam:24,
        status:'đang diễn ra'
    }
  ];
const gentData = array =>{
    let result 
    if(array.length > 0){
        result = array.map((d,i)=>
            <div key={i} className="tournaments">
                <div className="tournaments-image" style={{backgroundImage:`url(${d.logo})`}} />
                <div className="tournaments-name">{d.name}</div>
                <div className="tournaments-time">Thời gian diễn ra:{d.time}</div>
                <div className="tournaments-type">Thể thức:{d.type}</div>
                <div className="tournaments-organization">Đơn vị tổ chức:{d.organization}</div>
                <div className="tournaments-prize">Tổng giải thưởng:{d.prize}</div>
                <div >
                    <div className="tournaments-countTeam">{d.countTeam}</div>
                    <div className="tournaments-status">{d.status}</div>
                </div>
            </div>
        )
    }
    return result
}


function TournamentList() {
    if(data){
      return  <section className="tour-nament-list">
            <h2>Gải đấu</h2>
            <div className="list-item">
                {gentData(data)}
            </div>
            
        </section>
    }
    return 'loading'
}

export default TournamentList
