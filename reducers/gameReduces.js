import { REQUEST, SUCCESS, FAILURE, GET_GAMES } from 'actions/actionTypes';

const initialState = {
  games: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES[REQUEST]:
      return {
        ...state,
        loading: true
      };
    case GET_GAMES[SUCCESS]:
      return {
        ...state,
        games: action.games,
        loading: false
      };
    case GET_GAMES[FAILURE]:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
