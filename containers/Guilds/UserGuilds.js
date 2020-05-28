import React, { useEffect } from 'react';
import Link from 'components/LinkMaster';
import { useSelector, useDispatch } from 'react-redux';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import { getGuildsByUser } from 'actions/guildActions';
import { guildSelector, authSelector } from 'reducers/selectors';
import Loading from 'components/layouts/Loading';

const UserGuilds = () => {
  const dispatch = useDispatch();
  const { guildsByUser, loading } = useSelector(guildSelector);
  const { isAuthenticated } = useSelector(authSelector);
  const guildsOwnerByUser = guildsByUser.filter((guild) => guild.user_status.role == 'owner');
  const guildsJoinedByUser = guildsByUser.filter((guild) => guild.user_status.role == 'member');

  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  useEffect(() => {
    dispatch(getGuildsByUser.request());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div id='user-guilds' className='guild'>
      <div className='title'>
        <Link href='/'>
          <a>
            <span className='fun-ic ic-eclose-black'></span>
          </a>
        </Link>
        {'Bang của tôi'}
      </div>
      {guildsByUser.length > 0 ? (
        <>
          {guildsOwnerByUser.length > 0 ? (
            <div className='guilds-owner-by'>
              <div className='second-title'>
                <span className='fun-ic ic-shield-active'></span>
                {'Tôi làm bang chủ'}
              </div>
              {guildsOwnerByUser.map((guild) => (
                <Link key={guild._id} href='/guilds/[guildID]' as={`/guilds/${guild._id}`}>
                  <a>
                    <div className='guild-owner'>
                      <div className='guild-icon'>
                        <img src={guild.logo} alt={guild.guild_name} />
                      </div>
                      <div className='guild-info'>
                        <div className='guild-name'>{guild.guild_name}</div>
                        <div className='guild-game'>
                          <span>{`${guild.game_name} ${
                            guild.game_server ? `/ ${guild.game_server}` : ''
                          }`}</span>
                        </div>
                        <div className='guild-members'>
                          <div className='joined-members'>
                            <span className='fun-ic ic-members-active'></span>
                            <span className='count-member'>{`${guild.member_count}`}</span>
                            <span>Thành viên</span>
                          </div>
                          <div className='requested-members'>
                            <span className='fun-ic ic-request-active'></span>
                            {` Xin gia nhập bang (${guild.total_request}) `}
                            {guild.total_request > 0 ? <span className='fun-ic ic-alert-dot'></span> : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
          {guildsJoinedByUser.length > 0 ? (
            <div className='guilds-member-by'>
              <div className='second-title'>{'Bang tôi tham gia'}</div>
              {guildsJoinedByUser.map((guild) => (
                <Link key={guild._id} href='/guilds/[guildID]' as={`/guilds/${guild._id}`}>
                  <a>
                    <div className='guild-member'>
                      <div className='guild-icon'>
                        <img src={guild.logo} alt={guild.guild_name} />
                      </div>
                      <div className='guild-info'>
                        <div className='guild-name'>{guild.guild_name}</div>
                        <div className='guild-game'>
                          <span>{`${guild.game_name} ${
                            guild.game_server ? `/ ${guild.game_server}` : ''
                          }`}</span>
                        </div>
                        <div className='guild-members'>
                          <div className='guild-owner'>
                            <span className='ic-owner'></span>
                            {guild.username}
                          </div>
                          <div className='guild-status'>
                            <span className='ic-member'></span>
                            {`${guild.member_count}/50`}
                          </div>
                          {guild.user_status.status == 'joined' ? (
                            <div className={`request-status joined`}>
                              <span className={`fun-ic ic-check`}></span>
                              {`Thành viên`}
                            </div>
                          ) : (
                            <div className={`request-status`}>
                              <span className={`fun-ic ic-time`}></span>
                              {`Đang chờ duyệt`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className='empty-guilds'>
          <img src='/bang-hoi/statics/images/empty-here.svg' alt='' />
          <div className='second-title'>{'Danh sách bang của tôi'}</div>
          <div className='empty-guilds-content'>
            Hiện bạn chưa Tạo bang / Gia nhập bang nào. <br />
            Hãy trải nghiệm thử cùng chúng tôi
          </div>
          <div className='guild-nav'>
            <Link href='/guilds/create'>
              <a className='create-guild'>
                <span className='fun-ic ic-white-star'></span>
                {'Tạo bang'}
              </a>
            </Link>
            <Link href='/guilds/join'>
              <a className='request-join-guild'>
                <span className='fun-ic ic-request-active'></span>
                {'Gia nhập bang'}
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default withPrivateRoute(UserGuilds);
