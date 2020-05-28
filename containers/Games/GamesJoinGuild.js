import React, { useEffect } from 'react';
import Link from 'components/LinkMaster';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import { getGames } from 'actions/gameActions';
import { gameSelector, authSelector } from 'reducers/selectors';
import { useSelector, useDispatch } from 'react-redux';

import { LinkToJoinGuild, GameHaveGuild } from 'components/guild';
// import 'styles/pages/guild.scss';

const GamesJoinGuild = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  const { games } = useSelector(gameSelector);
  useEffect(() => {
    dispatch(getGames.request());
  }, []);

  return (
    <div id='join-guild' className='guild'>
      <div className='title'>
        <Link href='/'>
          <a>
            <span className='fun-ic ic-eclose-black'></span>
          </a>
        </Link>
        {'Chọn game'}
      </div>
      <div className='game-list'>
        {games.map((game) =>
          game.guild_id ? (
            <GameHaveGuild key={game.alias} game={game} />
          ) : (
            <LinkToJoinGuild key={game.alias} game={game} />
          )
        )}
      </div>
    </div>
  );
};

export default withPrivateRoute(GamesJoinGuild);
