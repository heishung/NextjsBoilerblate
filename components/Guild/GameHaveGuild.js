import { useState } from 'react';
import Link from 'components/LinkMaster';
import ReactModal from 'react-modal';

export default ({ game }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className='game-detail'
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <div className='game-icon'>
          <img src={game.icon} alt={game.id} />
        </div>
        <div className='game-title'>
          <span>{game.title}</span>
        </div>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        overlayClassName='modal-overlay'
        className='modal-game-have-guild modal-content'
        contentLabel='onRequestClose Example'
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='model-wrap'>
          <div className='title'>
            <span>{'Hệ thống thông báo'}</span>
          </div>
          <div className='game-icon'>
            <img src={game.icon} alt={game.title} />
            <span>{game.title}</span>
          </div>
          <div className='message'>
            <span>{'Tựa game bạn chọn đã có bang hoặc bạn đã gửi yêu cầu gia nhập bang!'}</span>
          </div>
          <div className='actions'>
            <div
              className='close modal-btn'
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <span>{'Chọn game khác'}</span>
            </div>
            <div className='guild-detail-link modal-btn'>
              <Link href='/guilds/[guildID]' as={`/guilds/${game.guild_id}`}>
                <a>{'Xem bang của tôi'}</a>
              </Link>
            </div>
          </div>
          <div className='notice'>
            <span className='fun-ic ic-error'></span>
            <span>{'Lưu ý mỗi tài khoản chỉ được ở trong 1 bang'}</span>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
