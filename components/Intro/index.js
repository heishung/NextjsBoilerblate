import React from 'react'
import './style.scss'
function ContentIntro() {
    return (
          
      <div id="container-intro">
        <div className="box-download-game">
            <div className="content-left img-game">
            <img className="img-game-downLoad" src="https://picsum.photos/80/80" alt="img-game-downLoad"/>
            </div>
            <div className="intro-content-right">
                <div className="intro-content-right-name">Tên game</div>
                <button className="intro-content-right-btn-download">
                Tải game
                </button>
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
