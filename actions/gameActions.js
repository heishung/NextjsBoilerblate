import { action, REQUEST, SUCCESS, FAILURE, GET_GAMES } from './actionTypes';

export const getGames = {
  request: () => action(GET_GAMES[REQUEST]),
  success: games => action(GET_GAMES[SUCCESS], { games }),
  failure: error => action(GET_GAMES[FAILURE], { error })
};
