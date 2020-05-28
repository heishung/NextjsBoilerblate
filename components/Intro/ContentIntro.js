import React from 'react'
import { Breadcrumb } from 'antd';
import styled from 'styled-components';

const ImgGameDownLoad = styled.div`
  width:80px;
  height:80px;
  border-radius:8px;
`
const BoxDownloadGame = styled.div`
  display: flex;
  flex-wrap:wrap;
`
const ContainerIntro = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
`

function ContentIntro() {
    return (
          
      <ContainerIntro>
        <BoxDownloadGame>
            <div className="content-left img-game">
            <ImgGameDownLoad/>
            </div>
            <div className="content-right">
                <div className="name">Tên game</div>
                <div className="btn-download">
                    <button className="">
                    Tải game
                    </button>
                </div>
            </div>
        </BoxDownloadGame>

        <div>
        <button>
            đăng kí đội
        </button>
        </div>
  </ContainerIntro>
    )
}

export default ContentIntro
