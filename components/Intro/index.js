import React from 'react'
import './style.scss'
import imageDownload from './image-download.jpg'
import iconDownload from './icon-download.png'
import styled from 'styled-components'

const Button = styled.button`
    background-color:white;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
`
const NameGame = styled.h3`
   color: #262626;
   font-weight: 600;
   font-size: 24px;
   line-height: 32px;
   margin-bottom: 15px;
`
function ContentIntro() {
    return (
          
      <div id="container-intro">
        <div className="box-download-game">
            <div className="content-left img-game">
            <img className="img-game-downLoad" src={imageDownload} alt="img-game-downLoad"/>
            </div>
            <div className="intro-content-right">
                <NameGame className="intro-content-right-name">PUBG MOBILE VN</NameGame>
                <Button className="intro-content-right-btn-download">
                    <img src={iconDownload} alt="Download" /> Tải game tại đây
                </Button>
            </div>
        </div>

        {/* <div>
        <button>
            đăng kí đội
        </button>
        </div> */}
  </div>
    )
}

export default ContentIntro
