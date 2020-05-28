import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import Avatar from 'react-avatar';

import GiftBoxTab from './GiftBoxTab';
import { acceptJoinGuild, rejectJoinGuild, setShowJoinedTab } from 'actions/guildActions';
import { guildSelector } from 'reducers/selectors';
import { formatDate } from 'utils/formater';

const DetailTabs = ({ guild, user }) => {
  const dispatch = useDispatch();
  const { showJoinedTab } = useSelector(guildSelector);
  const guildID = guild._id;

  const isOwner = guild.user_id == user.id;
  const isMember =
    guild.user_status && guild.user_status.role == 'member' && guild.user_status.status == 'joined';
  const isWaiting =
    guild.user_status && guild.user_status.role == 'member' && guild.user_status.status == 'requested';
  const isViewer = !isOwner && !isMember && !isWaiting;

  const [activeTab, setActiveTab] = useState(isWaiting || isViewer ? 'preferential-gifts' : 'list-member');
  const [showNoticeFullMember, setShowNoticeFullMember] = useState(false);

  const joinedMembers = guild.members.filter(
    (member) => member.status == 'joined' && member.user_id != guild.user_id
  );
  const requestedMembers = guild.members.filter((member) => member.status == 'requested');

  const handleRemove = (memberID) => {
    dispatch(rejectJoinGuild.request(guildID, memberID));
  };

  const handleReject = (memberID) => {
    dispatch(rejectJoinGuild.request(guildID, memberID));
  };

  const handleAccept = (memberID) => {
    if (guild.member_count < 50) {
      dispatch(acceptJoinGuild.request(guildID, memberID));
    } else {
      setShowNoticeFullMember(true);
    }
  };

  return (
    <>
      <div className='content-wrapper list-member bg_white'>
        <div className='box-ctrl'>
          {isWaiting || isViewer ? null : (
            <div
              className={`bt-ctrl ${activeTab != 'list-member' || 'active'}`}
              onClick={() => {
                setActiveTab('list-member');
              }}
            >
              Thành viên
            </div>
          )}
          <div
            className={`bt-ctrl ${activeTab != 'preferential-gifts' || 'active'}`}
            onClick={() => {
              setActiveTab('preferential-gifts');
            }}
          >
            Quà ưu đãi
          </div>
          {isWaiting || isViewer ? null : (
            <div
              className={`bt-ctrl ${activeTab != 'overview' || 'active'}`}
              onClick={() => {
                setActiveTab('overview');
              }}
            >
              Tổng quan
            </div>
          )}
        </div>
      </div>
      {isWaiting || isViewer ? null : (
        <div
          className={`content-wrapper bg_white tab-content ${activeTab != 'list-member' || 'active'}`}
          id='list-member'
        >
          <div className='box-list'>
            <div
              className={`action-member ${!showJoinedTab || 'active'}`}
              onClick={() => {
                dispatch(setShowJoinedTab(true));
              }}
            >
              <span>{`Đã gia nhập (${guild.member_count})`}</span>
            </div>
            {isOwner ? (
              <div
                className={`action-member ${showJoinedTab || 'active'}`}
                onClick={() => {
                  dispatch(setShowJoinedTab(false));
                }}
              >
                {guild.request_count > 0 ? <span className='fun-ic ic-alert-dot'></span> : null}
                <span>{`Chờ duyệt (${guild.request_count})`}</span>
              </div>
            ) : null}
          </div>
          <div className={`list-all tab-content ${!showJoinedTab || 'active'}`} id='tab-list'>
            <div className='mem-item bc'>
              <Avatar
                round
                name={guild.username}
                size='36'
                textSizeRatio={2.4}
                style={{ marginRight: '10px' }}
              />
              <div className='mem-item-info'>
                <div className='mem-item-name'>
                  {guild.username} <span className='us-id'>- ID {guild.user_id}</span>
                </div>
                <div className='mem-item-office'>
                  <span className='fun-ic ic-shield-active'></span>
                  {`Bang chủ từ ngày ${formatDate(guild.created_at)}`}
                </div>
              </div>
            </div>
            {joinedMembers.map((member) => (
              <div className='mem-item tv' key={member.user_id}>
                <Avatar
                  round
                  name={member.username}
                  size='36'
                  textSizeRatio={2.4}
                  style={{ marginRight: '10px' }}
                />
                <div className='mem-item-info'>
                  <div className='mem-item-name'>
                    {member.username} <span className='us-id'>- ID {member.user_id}</span>
                  </div>
                  <div className='mem-item-office'>
                    <span className='time-join'>{`Thành viên từ ngày ${formatDate(member.updated_at)}`}</span>
                  </div>
                </div>
                {isOwner ? (
                  <div className='btn-action'>
                    <div className='btn-delele' onClick={() => handleRemove(member._id)}></div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className={`list-all tab-content ${showJoinedTab || 'active'}`} id='tab-pending'>
            {requestedMembers.map((member) => (
              <div className='mem-item tv' key={member.user_id}>
                <Avatar
                  round
                  name={member.username}
                  size='36'
                  textSizeRatio={2.4}
                  style={{ marginRight: '10px' }}
                />
                <div className='mem-item-info'>
                  <div className='mem-item-name'>
                    {member.username} <span className='us-id'>ID {member.user_id}</span>
                  </div>
                  <div className='mem-item-office'>
                    <span className='time-join'>{formatDate(member.updated_at)}</span>
                  </div>
                </div>
                <div className='btn-action'>
                  <div className='btn-delele' onClick={() => handleReject(member._id)}></div>
                  <div className='btn-check' onClick={() => handleAccept(member._id)}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={`content-wrapper bg_white tab-content ${activeTab != 'preferential-gifts' || 'active'}`}
        id='preferential-gifts'
      >
        <div className='gift-boxes '>
          <GiftBoxTab guild={guild} isOwner={isOwner} isMember={isMember} />
        </div>
      </div>
      {isWaiting || isViewer ? null : (
        <div
          className={`content-wrapper bg_white tab-content ${activeTab != 'overview' || 'active'}`}
          id='overview'
        >
          <div className='box-overview'>
            <span>{guild.description}</span>
          </div>
        </div>
      )}
      <ReactModal
        ariaHideApp={false}
        isOpen={showNoticeFullMember}
        overlayClassName='modal-overlay'
        className='modal-confirm-close-guild-content modal-content'
        contentLabel='onRequestClose Example'
        onRequestClose={() => {
          setShowNoticeFullMember(!showNoticeFullMember);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='model-wrap'>
          <div className='confirm-message'>
            <div className='message-title'>{'Thông báo'}</div>
            <div className='message-content'>
              {'Hiện tại bang đã đủ thành viên, không thể chiêu mộ thêm thành viên mới.'}
            </div>
          </div>
          <div className='actions'>
            <button>
              <a
                onClick={() => {
                  setShowNoticeFullMember(!showNoticeFullMember);
                }}
              >
                {'OK'}
              </a>
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default DetailTabs;
