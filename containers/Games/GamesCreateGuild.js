import React, { useEffect } from 'react';
import Link from 'components/LinkMaster';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import { getGames } from 'actions/gameActions';
import { gameSelector, authSelector } from 'reducers/selectors';
import { useSelector, useDispatch } from 'react-redux';

import { LinkToCreateGuild, GameHaveGuild } from 'components/guild';
// import 'styles/pages/guild.scss';

const GamesCreateGuild = () => {
  const dispatch = useDispatch();
  const { games } = useSelector(gameSelector);

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  useEffect(() => {
    dispatch(getGames.request());
  }, []);
  return (
    <div id='create-guild' className='guild'>
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
            <LinkToCreateGuild key={game.alias} game={game} />
          )
        )}
      </div>
    </div>
  );
};

export default withPrivateRoute(GamesCreateGuild);
