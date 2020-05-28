import Link from 'components/LinkMaster';

export default ({ game }) => {
  return (
    <>
      <Link href='/guilds/create/[gameAlias]' as={`/guilds/create/${game.alias}`}>
        <a>
          <div className='game-detail'>
            <div className='game-icon'>
              <img src={game.icon} alt={game.id} />
            </div>
            <div className='game-title'>
              <span>{game.title}</span>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
