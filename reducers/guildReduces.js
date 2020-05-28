import {
  REQUEST,
  SUCCESS,
  FAILURE,
  CREATE_GUILD,
  UPDATE_GUILD,
  RESET_CREATED_GUILD,
  GET_GUILD,
  GET_GUILDS_IN_GAME,
  GET_GUILDS_BY_USER,
  REQUEST_JOIN,
  CANCEL_JOIN,
  RESET_SEND_REQUEST_JOIN_STATUS,
  ACCEPT_JOIN,
  REJECT_JOIN,
  CLOSE_GUILD,
  RESET_RESULT_STATUS,
  SET_SHOW_JOINED_TAB,
  RESET_ERROR,
} from 'actions/actionTypes';

const initialState = {
  guildsInGame: [],
  guildsByUser: [],
  createdGuild: {},
  guildDetail: {},
  requestedGuildID: null,
  error: null,
  showJoinedTab: true,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_GUILD[REQUEST]:
    case UPDATE_GUILD[REQUEST]:
    case GET_GUILD[REQUEST]:
    case GET_GUILDS_IN_GAME[REQUEST]:
    case GET_GUILDS_BY_USER[REQUEST]:
    case REQUEST_JOIN[REQUEST]:
    case CANCEL_JOIN[REQUEST]:
    case ACCEPT_JOIN[REQUEST]:
    case REJECT_JOIN[REQUEST]:
    case CLOSE_GUILD[REQUEST]:
      return {
        ...state,
        loading: true,
      };
    case CREATE_GUILD[SUCCESS]:
      return {
        ...state,
        createdGuild: action.guild,
        loading: false,
      };
    case UPDATE_GUILD[SUCCESS]:
      return {
        ...state,
        guildDetail: action.updateGuidSuccessData,
        isUpdateGuidSuccess: true,
        loading: false,
      };
    case RESET_CREATED_GUILD:
      return {
        ...state,
        createdGuild: {},
      };
    case GET_GUILD[SUCCESS]:
      return {
        ...state,
        guildDetail: action.guild,
        loading: false,
      };
    case GET_GUILD[FAILURE]:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_GUILDS_IN_GAME[SUCCESS]:
      return {
        ...state,
        guildsInGame: action.guilds,
        loading: false,
      };
    case GET_GUILDS_BY_USER[SUCCESS]:
      return {
        ...state,
        guildsByUser: action.guilds,
        loading: false,
      };
    case REQUEST_JOIN[SUCCESS]:
      return {
        ...state,
        requestedGuildID: action.guildID,
        guildDetail: {
          ...state.guildDetail,
          user_status: {
            ...action.newRequest,
          },
        },
        loading: false,
      };
    case RESET_SEND_REQUEST_JOIN_STATUS:
      return {
        ...state,
        requestedGuildID: null,
      };
    case CLOSE_GUILD[SUCCESS]:
      return {
        ...state,
        guildDetail: {
          ...state.guildDetail,
          delete: true,
        },
        loading: false,
      };
    case CANCEL_JOIN[SUCCESS]:
      return {
        ...state,
        guildDetail: {
          ...state.guildDetail,
          user_status: null,
        },
        loading: false,
      };
    case SET_SHOW_JOINED_TAB:
      return {
        ...state,
        showJoinedTab: action.showJoinedTab,
      };
    case ACCEPT_JOIN[SUCCESS]:
      return {
        ...state,
        guildDetail: {
          ...state.guildDetail,
          members: [
            ...state.guildDetail.members.map((member) =>
              member._id == action.requestID ? { ...member, status: 'joined' } : member
            ),
          ],
          member_count: state.guildDetail.member_count + 1,
          request_count: state.guildDetail.request_count - 1,
        },
        loading: false,
      };
    case REJECT_JOIN[SUCCESS]:
      return {
        ...state,
        guildDetail: {
          ...state.guildDetail,
          members: [...state.guildDetail.members.filter((member) => member._id != action.requestID)],
          member_count: state.guildDetail.member_count - 1,
        },
        loading: false,
      };
    case CREATE_GUILD[FAILURE]:
    case UPDATE_GUILD[FAILURE]:
    case GET_GUILDS_BY_USER[FAILURE]:
    case GET_GUILDS_IN_GAME[FAILURE]:
    case REQUEST_JOIN[FAILURE]:
    case CANCEL_JOIN[FAILURE]:
    case ACCEPT_JOIN[FAILURE]:
    case REJECT_JOIN[FAILURE]:
    case CLOSE_GUILD[FAILURE]:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case RESET_RESULT_STATUS:
      return {
        ...state,
        isUpdateGuidSuccess: false,
      };
    default:
      return state;
  }
}
