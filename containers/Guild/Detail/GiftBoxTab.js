import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';

import { giftStatuses } from 'configs/gift';

import { getGifts, takeGift } from 'actions/giftActions';
import { giftSelector } from 'reducers/selectors';

import { SingleGift } from 'components/Guild/Detail';
import { GiftLoader } from 'components/Loaders';

const GiftBoxTab = ({ guild, isOwner, isMember }) => {
  const dispatch = useDispatch();
  const { gifts, loading } = useSelector(giftSelector);
  const [gift, setGift] = useState({});
  const needUpdateGuildInfo = !guild.facebook_user_link || !guild.facebook_group_link || !guild.slogan || !guild.description;

  useEffect(() => {
    dispatch(getGifts.request(guild.game_id, guild._id));
  }, []);

  const handleShowGift = (giftID) => {
    const gift = gifts[giftID];

    if (gift.user_status != giftStatuses.qualified) {
      setGift(gift);
    } else {
      // Change reducer gift[gifts]
      takeGift(giftID);
      // Redirect to playfun
      window.open(gift.url, '_blank');
    }
  };

  return loading ? (
    <GiftLoader count={4} />
  ) : (
    <>
      {gifts.map((gift, key) => (
        <SingleGift key={key} giftID={key} gift={gift} isOwner={isOwner} showGift={(giftID) => handleShowGift(giftID)} />
      ))}
      <ReactModal
        ariaHideApp={false}
        isOpen={gift.title != undefined}
        overlayClassName='modal-overlay'
        className='modal-show-gift-detail modal-content'
        onRequestClose={() => {
          setGift({});
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='gift-header'>
          <img src='/bang-hoi/statics/images/gift-big.svg' alt='' />
        </div>
        <div className='model-wrap'>
          <div className='gift-detail'>
            <div className='title'>{gift.title}</div>
            <div className='detail detail-conditions'>
              <h4>{'Điều kiện'}</h4>
              <ul>
                {!gift.conditions ||
                  gift.conditions.map((condition) => (
                    <li key={condition.type}>
                      <span className={`fun-ic ${condition.completed ? 'ic-check-circle-green' : 'ic-check-circle-grey'}`}></span>
                      {condition.type_text}
                    </li>
                  ))}
              </ul>
            </div>
            <div className='detail detail-description'>
              <h4>{'Mô tả'}</h4>
              {gift.description}
              {/* {
                'Quà dành cho các thành viên của Bang hội chiêu mộ đủ 20 thành viên và bang chủ cập nhật đủ thông tin bang. Hệ thống sẽ tổng kết và phát quà vào 12h00  05/05/2020'
              } */}
            </div>
            <div className='detail detail-gift-rewards'>
              <h4>{'Chi tiết phần quà'}</h4>
              {gift.gc_rewards}
              {/* {'50.000 vàng, Sách khiêu chiến đấu trường *2, Thuốc năng lượng *10, Rương mảnh digimon.'} */}
            </div>
            {gift.user_status != giftStatuses.received || (
              <div className='action'>
                <a className='fun-btn' href={gift.url} target='_blank'>
                  {'Đổi quà'}
                </a>
              </div>
            )}
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default GiftBoxTab;
