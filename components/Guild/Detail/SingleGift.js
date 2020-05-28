import React from 'react';
import { giftStatuses } from 'configs/gift';

const getBtnStatus = (userStatus) => {
  switch (userStatus) {
    case giftStatuses.unqualified:
      return 'Xem';
    case giftStatuses.qualified:
      return 'Nhận';
    case giftStatuses.received:
    case giftStatuses.exchanged:
      return 'Đã nhận';
    default:
      return 'Xem';
  }
};

const SingleGift = ({ gift, showGift, giftID }) => {
  const btnText = getBtnStatus(gift.user_status);

  return (
    <div className='gift-box'>
      <div className='gift-icon'>
        <span className='fun-ic ic-gift'></span>
      </div>
      <div className='title-and-condition'>
        <div className='gift-title'>{gift.title}</div>
        <div className='gift-condition'>{gift.description}</div>
      </div>
      <div className='action'>
        <button
          className={`fun-btn active`}
          onClick={() => {
            showGift(giftID);
          }}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default SingleGift;
