import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';
import ReactModal from 'react-modal';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import ChangeOrderGuild from 'components/guild/ChangeOrderGuild';

import { getGuildsInGame, requestJoinGuild, resetSendRequestStatus, resetError } from 'actions/guildActions';
import { guildSelector, authSelector } from 'reducers/selectors';

// import 'styles/pages/guild.scss';

const JoinGuild = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameAlias } = router.query;

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  const { guildsInGame, requestedGuildID, error } = useSelector(guildSelector);
  const requestedGuild = guildsInGame.find((guild) => guild._id == requestedGuildID);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchGuildName, setSearchGuildName] = useState('');

  const options = [
    { value: 'newest', label: 'Mới nhất', labelInput: 'Mới nhất' },
    { value: 'exciting', label: 'Sôi nổi nhất', labelInput: 'Sôi nổi' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const filteredGuilds = guildsInGame.filter(
    (guild) => guild.guild_name.toLowerCase().indexOf(searchGuildName.toLowerCase()) > -1
  );
  const showingGuilds =
    selectedOption.value == 'exciting'
      ? filteredGuilds.sort((a, b) => b.member_count - a.member_count)
      : filteredGuilds;

  useEffect(() => {
    dispatch(getGuildsInGame.request(gameAlias));
  }, []);

  const handleCloseModal = (e) => {
    dispatch(resetSendRequestStatus());
    dispatch(getGuildsInGame.request(gameAlias));
  };

  const handleJoin = (guildID) => {
    dispatch(requestJoinGuild.request(guildID));
  };

  const handleResetError = () => {
    dispatch(resetError());
  };

  return (
    <div id='join-guild' className='guild'>
      <div className='title'>
        <span className='fun-ic ic-eback-black' onClick={() => router.back()}></span>
        {'Gia nhập bang'}
      </div>
      <div className='filter-and-order-guild'>
        <div className='order-guild'>
          <ChangeOrderGuild
            onChangeOrder={(selectOption) => {
              setSelectedOption(selectOption);
            }}
            options={options}
            selectedOption={selectedOption}
          />
        </div>
        <div className='filter-guild'>
          <input
            type='text'
            placeholder='Tìm kiếm'
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                setSearchGuildName(searchInputValue);
              }
            }}
          />
          <span
            className='fun-ic ic-search'
            onClick={() => {
              setSearchGuildName(searchInputValue);
            }}
          ></span>
        </div>
      </div>
      <div className='guilds-list'>
        {showingGuilds.length > 0 ? (
          showingGuilds.map((guild) => (
            <div className='guild-detail' key={guild._id}>
              <div className='guild-info'>
                <div className='guild-logo-name'>
                  <div className='guild-logo'>
                    <img src={guild.logo} alt={guild.guild_name} />
                  </div>
                  <div className='guild-name'>
                    <span className='name one-line-ellipsis'>{guild.guild_name}</span>
                    <span className='guild-game-server-name one-line-ellipsis'>
                      {guild.game_name}
                      {guild.game_server ? ` / ${guild.game_server}` : ''}
                    </span>
                  </div>
                </div>
                <div className='link-to-guild'>
                  <Link href='/guilds/[guildID]' as={`/guilds/${guild._id}`}>
                    <a>{'Xem'}</a>
                  </Link>
                </div>
              </div>
              <div className='guild-member-info'>
                <div className='guild-owner-stat'>
                  <div className='guild-owner'>
                    <span>{'Bang chủ'}</span>
                    <span className='guild-owner-name'>
                      <span className='ic-owner'></span>
                      {guild.username}
                    </span>
                  </div>
                  <div className='guild-stat'>
                    <span>{'Thành viên'}</span>
                    <span>
                      <span className='ic-memmer'></span>
                      <span className='guild-member-count'>{guild.member_count}</span>
                      {'/ 50'}
                    </span>
                  </div>
                </div>
                <div className='request-join-guild'>
                  {guild.user_status ? (
                    <div className='fun-btn disable'>{'Gia nhập'}</div>
                  ) : (
                    <div
                      className='fun-btn'
                      onClick={() => {
                        handleJoin(guild._id);
                      }}
                    >
                      {'Gia nhập'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='empty-guilds'>
            <img src='/bang-hoi/statics/images/empty-here.svg' alt='' />
            <div className='second-title'></div>
            <div className='empty-guilds-content'>{'Không tìm được bang nào phù hợp'}</div>
          </div>
        )}
      </div>
      {requestedGuild ? (
        <ReactModal
          ariaHideApp={false}
          isOpen={!!requestedGuildID}
          overlayClassName='modal-overlay'
          className='modal-join-guild-success-content modal-content'
          contentLabel='onRequestClose Example'
        >
          <div className='model-wrap'>
            <div className='success'>{'Gửi yêu cầu gia nhập bang thành công'}</div>
            <div className='guild-image'>
              <img src={requestedGuild.logo} alt='' />
            </div>
            <div className='guild-info'>
              <div className='game-name'>{`${requestedGuild.game_name} - Funtap`}</div>
              {/* <div className='game-name'>{`Nhất kiếm giang hồ - Funtap`}</div> */}
              <div className='guild-name'>{`${requestedGuild.guild_name}`}</div>
              {/* <div className='guild-name'>{`Bang: Cửu nhân tái thế`}</div> */}
              {requestedGuild.game_server ? (
                <div className='server-name'>{`Server: ${requestedGuild.game_server}`}</div>
              ) : null}
              {/* <div className='server-name'>{`Server: Mộc Kiếm`}</div> */}
            </div>
            <div className='actions'>
              <div className='fun-btn close-modal' onClick={(e) => handleCloseModal(e)}>
                {'Đóng'}
              </div>
              <Link href='/guilds/[guildID]' as={`/guilds/${requestedGuild._id}`}>
                <a className='fun-btn' onClick={(e) => handleCloseModal(e)}>
                  {'Xem thông tin'}
                </a>
              </Link>
            </div>
          </div>
        </ReactModal>
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
    </div>
  );
};

export default withPrivateRoute(JoinGuild);
