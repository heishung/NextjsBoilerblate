import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Link from 'components/LinkMaster';
import ReactModal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';
import { formatDateTime } from 'utils/formater';
import { DetailTabs, GamePromos } from './Detail';

import {
  getGuild,
  closeGuild,
  requestJoinGuild,
  cancelJoinGuild,
  resetSendRequestStatus,
  resetError,
  resetResultState,
} from 'actions/guildActions';
import { getGames } from 'actions/gameActions';
import { guildSelector, authSelector, gameSelector } from 'reducers/selectors';
import Loading from 'components/layouts/Loading';

const GuildDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { guildID } = router.query;
  const { user, isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  const { guildDetail, loading, requestedGuildID, error, isUpdateGuidSuccess } = useSelector(guildSelector);
  const { games } = useSelector(gameSelector);
  const [alertCopy, setAlertCopy] = useState(false);

  // TODO: need refactor
  const guildDetailLoaded = !isEmpty(guildDetail);
  if (!isEmpty(guildDetail) && guildDetail.delete) {
    router.push('/guilds/me');
  }

  const isOwner = guildDetail.user_id == user.id;
  const isMember =
    guildDetailLoaded &&
    guildDetail.user_status &&
    guildDetail.user_status.role == 'member' &&
    guildDetail.user_status.status == 'joined';
  const isWaiting =
    guildDetailLoaded &&
    guildDetail.user_status &&
    guildDetail.user_status.role == 'member' &&
    guildDetail.user_status.status == 'requested';
  const isViewer = !isOwner && !isMember && !isWaiting;

  const gameOfGuild = guildDetailLoaded && games.length > 0 ? games.find((game) => game.id == guildDetail.game_id) : {};

  const [showConfig, setShowConfig] = useState(false);
  const [showWarningClose, setShowWarningClose] = useState(false);
  const [showWarningCancelRequest, setShowWarningCancelRequest] = useState(false);

  useEffect(() => {
    dispatch(getGuild.request(guildID));
  }, []);

  useEffect(() => {
    if (games.length == 0) {
      dispatch(getGames.request());
    }
  }, []);

  useEffect(() => {
    if (isUpdateGuidSuccess) {
      setTimeout(() => dispatch(resetResultState()), 5000);
    }
  }, [isUpdateGuidSuccess]);

  const handleCloseGuild = () => {
    setShowWarningClose(false);
    dispatch(closeGuild.request(guildID));
  };

  const handleJoin = () => {
    dispatch(requestJoinGuild.request(guildID));
  };

  const handleCloseSuccessRequest = (e) => {
    dispatch(resetSendRequestStatus());
  };

  const handleCancelRequest = () => {
    setShowWarningCancelRequest(!showWarningCancelRequest);
    dispatch(cancelJoinGuild.request(guildID));
  };

  const handleResetError = () => {
    dispatch(resetError());
  };

  return loading || !guildDetail._id || isEmpty(user) ? (
    <Loading />
  ) : (
    <div id='guild-detail-page' className='guild '>
      <Head>
        <title>Chi tiết bang hội</title>
        <meta property='og:title' key='og_title' content={guildDetail.guild_name} />
      </Head>
      <div className='title'>
        <a
          onClick={() => {
            router.back();
          }}
        >
          <span className='fun-ic ic-eback-black'></span>
        </a>
        <h3 className='rs'>{'Chi tiết bang'}</h3>
      </div>{' '}
      <div className='content-wrapper bg_white guild-info-wrapper'>
        {isWaiting ? (
          <>
            <div className='pending-request'>
              <span className='fun-ic ic-time'></span>
              <div className='pending-info'>
                <span className='pending-text'>{'Yêu cầu gia nhập bang của bạn đang chờ duyệt'}</span>
                <span className='pending-time'>
                  {'Gửi lúc '}
                  {formatDateTime(guildDetail.user_status.created_at)}
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
                    <span>{guildDetail.guild_name}</span>
                    {' game '}
                    <span>{guildDetail.game_name}</span>
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
                        handleCancelRequest();
                      }}
                    >
                      {'Đồng ý'}
                    </a>
                  </button>
                </div>
              </div>
            </ReactModal>
          </>
        ) : null}
        {isUpdateGuidSuccess ? (
          <div className='update-success'>
            <span className='fun-ic ic-check-2'></span>
            {`Chỉnh sửa thông tin bang thành công`}
          </div>
        ) : null}
        <div className='guild-info'>
          <div className='avatar-guild'>
            <img src={guildDetail.logo} alt='' />
          </div>
          <div className='guild-detail'>
            <div className='guild-name'>
              <div>{guildDetail.guild_name}</div>
              {isOwner ? (
                <span
                  className='fun-ic ic-gear'
                  onClick={() => {
                    setShowConfig(true);
                  }}
                ></span>
              ) : null}
            </div>
            <div className='game-sv gray-text'>{`${guildDetail.game_name}${
              guildDetail.game_server ? ` / ${guildDetail.game_server}` : ''
            }`}</div>
            <div className='info-member'>
              <div className='bcg'>
                <span className='fun-ic ic-shield-active'></span>
                <span className='guild-owner-name'>{isOwner ? 'Bang chủ' : `${guildDetail.username} - Bang chủ`}</span>
              </div>
              <div className='member-number'>
                <span className='fun-ic ic-members-active'></span>
                <span className='count-member'>{`${guildDetail.member_count} người`}</span>
              </div>
            </div>
          </div>
        </div>
        {!!guildDetail.slogan ? (
          <div className='guild-slogan'>
            <div className='slg-title gray-text'>Khẩu hiệu bang</div>
            <div className='slg-content'>
              <span>{guildDetail.slogan}</span>
            </div>
          </div>
        ) : null}
        <GamePromos game={gameOfGuild} />
      </div>
      {isOwner ? (
        <div className='content-wrapper link-invite bg_white'>
          <div className='box-invite'>
            <div className='title-invite'>Link mời chiến hữu</div>
            <div className='input-copy-wrapper'>
              <input type='text' defaultValue={window.location.href} id='inputCopy' readOnly />
              <CopyToClipboard
                onCopy={() => {
                  setAlertCopy(true);
                  setTimeout(() => setAlertCopy(false), 3000);
                }}
                text={window.location.href}
              >
                <span className='copy-btn'>Sao chép</span>
              </CopyToClipboard>
            </div>
            <div className={`alert-copy ${alertCopy ? 'showed' : ''}`} onClick={() => setAlertCopy(false)}>
              <span className='fun-ic ic-check-white'></span>
              {'Đã sao chép link'}
            </div>
          </div>
        </div>
      ) : null}
      <DetailTabs guild={guildDetail} user={user} />
      {isOwner ? (
        <>
          <ReactModal
            ariaHideApp={false}
            isOpen={showConfig}
            overlayClassName='modal-overlay'
            className='modal-user-content modal-content'
            contentLabel='onRequestClose Example'
            onRequestClose={() => {
              setShowConfig(!showConfig);
            }}
            shouldCloseOnOverlayClick={true}
          >
            <div className='model-wrap'>
              <button>
                <Link href='/guilds/[guildID]/edit' as={`/guilds/${guildDetail._id}/edit`}>
                  <a>{'Sửa thông tin bang'}</a>
                </Link>
              </button>
              <button>
                <a
                  onClick={() => {
                    setShowWarningClose(!showWarningClose);
                    setShowConfig(!showConfig);
                  }}
                >
                  <span className='fun-ic ic-lock'></span>
                  {'Đóng bang'}
                </a>
              </button>
            </div>
          </ReactModal>
          <ReactModal
            ariaHideApp={false}
            isOpen={showWarningClose}
            overlayClassName='modal-overlay'
            className='modal-confirm-close-guild-content modal-content'
            contentLabel='onRequestClose Example'
            onRequestClose={() => {
              setShowWarningClose(!showWarningClose);
            }}
            shouldCloseOnOverlayClick={true}
          >
            <div className='model-wrap'>
              <div className='confirm-message'>
                <div className='message-title'>{'Thông báo'}</div>
                <div className='message-content'>
                  {'Bang sau khi đóng sẽ không thể truy cập được nữa. Bạn có chắc chắn muốn đóng Bang?'}
                </div>
              </div>
              <div className='actions'>
                <button>
                  <a
                    onClick={() => {
                      setShowWarningClose(!showWarningClose);
                    }}
                  >
                    {'Huỷ'}
                  </a>
                </button>
                <button>
                  <a
                    onClick={() => {
                      handleCloseGuild();
                    }}
                  >
                    {'Đóng bang'}
                  </a>
                </button>
              </div>
            </div>
          </ReactModal>
        </>
      ) : null}
      {isViewer ? (
        <>
          <div
            className='fun-btn request-join-guild-in-detail'
            onClick={() => {
              handleJoin();
            }}
          >
            {'Gửi yêu cầu gia nhập bang'}
          </div>
        </>
      ) : null}
      <ReactModal
        ariaHideApp={false}
        isOpen={!!error}
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
              <div>{error}</div>
            </div>
          </div>
          <div className='actions'>
            <button>
              <a
                onClick={() => {
                  handleResetError();
                }}
              >
                {'OK'}
              </a>
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        ariaHideApp={false}
        isOpen={!!requestedGuildID}
        overlayClassName='modal-overlay'
        className='modal-join-guild-success-content modal-content'
        contentLabel='onRequestClose Example'
      >
        <div className='model-wrap'>
          <div className='success'>
            <span className='fun-ic ic-check-2'></span>
            {'Gửi yêu cầu gia nhập bang thành công'}
          </div>
          <div className='guild-image'>
            <img src={guildDetail.logo} alt='' />
          </div>
          <div className='guild-info'>
            <div className='game-name'>{`${guildDetail.game_name} - Funtap`}</div>
            <div className='guild-name'>{`${guildDetail.guild_name}`}</div>
            {guildDetail.game_server ? <div className='server-name'>{`Server: ${guildDetail.game_server}`}</div> : null}
          </div>
          <div className='actions'>
            <a className='fun-btn close-modal' onClick={(e) => handleCloseSuccessRequest(e)}>
              {'Đóng'}
            </a>
            <a className='fun-btn' onClick={(e) => handleCloseSuccessRequest(e)}>
              {'Xem thông tin'}
            </a>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default withPrivateRoute(GuildDetail);
