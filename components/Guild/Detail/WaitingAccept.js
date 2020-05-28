import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { formatDateTime } from 'utils/formater';

const WaitingAccept = ({ guildName, gameName, requestedTime, cancelRequest }) => {
  const [showWarningCancelRequest, setShowWarningCancelRequest] = useState(false);

  return (
    <>
      <div className='pending-request'>
        <span className='fun-ic ic-time'></span>
        <div className='pending-info'>
          <span className='pending-text'>{'Yêu cầu gia nhập bang của bạn đang chờ duyệt'}</span>
          <span className='pending-time'>
            {'Gửi lúc '}
            {formatDateTime(requestedTime)}
          </span>
        </div>
        <span
          className='fun-ic ic-more'
          onClick={() => {
            setShowWarningCancelRequest(!showWarningCancelRequest);
          }}
        ></span>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showWarningCancelRequest}
        overlayClassName='modal-overlay'
        className='modal-confirm-cancel-request-content modal-content'
        contentLabel='onRequestClose Example'
        onRequestClose={() => {
          setShowWarningCancelRequest(!showWarningCancelRequest);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='model-wrap'>
          <div className='confirm-message'>
            <div className='message-title'>{'Thông báo'}</div>
            <div className='message-content'>
              {'Bạn muốn huỷ yêu cầu gia nhập bang '}
              <span>{guildName}</span>
              {' game '}
              <span>{gameName}</span>
            </div>
          </div>
          <div className='actions'>
            <button>
              <a
                onClick={() => {
                  setShowWarningCancelRequest(!showWarningCancelRequest);
                }}
              >
                {'Hủy'}
              </a>
            </button>
            <button>
              <a
                onClick={() => {
                  setShowWarningCancelRequest(!showWarningCancelRequest);
                  cancelRequest();
                }}
              >
                {'Đồng ý'}
              </a>
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default WaitingAccept;
