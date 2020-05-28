import React from 'react'
import './style.scss'
function ContentIntro() {
    return (
          
      <div id="container-intro">
        <div className="box-download-game">
            <div className="content-left img-game">
            <div className="img-game-downLoad"/>
            </div>
            <div className="content-right">
                <div className="name">Tên game</div>
                <div className="btn-download">
                    <button className="">
                    Tải game
                    </button>
                </div>
            </div>
        </div>

        <div>
        <button>
            đăng kí đội
        </button>
        </div>
  </div>
    )
}

export default ContentIntro
