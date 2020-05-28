import {
  action,
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
} from './actionTypes';

export const createGuild = {
  request: (guild) => action(CREATE_GUILD[REQUEST], { guild }),
  success: (guild) => action(CREATE_GUILD[SUCCESS], { guild }),
  failure: (error) => action(CREATE_GUILD[FAILURE], { error }),
};

export const updateGuild = {
  request: (guildID, guild) => action(UPDATE_GUILD[REQUEST], { guildID, guild }),
  success: (updateGuidSuccessData) => action(UPDATE_GUILD[SUCCESS], { updateGuidSuccessData }),
  failure: (error) => action(UPDATE_GUILD[FAILURE], { error }),
};

export const getGuild = {
  request: (guildID) => action(GET_GUILD[REQUEST], { guildID }),
  success: (guild) => action(GET_GUILD[SUCCESS], { guild }),
  failure: (error) => action(GET_GUILD[FAILURE], { error }),
};
export const resetCreatedGuild = () => action(RESET_CREATED_GUILD);

export const getGuildsInGame = {
  request: (gameID) => action(GET_GUILDS_IN_GAME[REQUEST], { gameID }),
  success: (guilds) => action(GET_GUILDS_IN_GAME[SUCCESS], { guilds }),
  failure: (error) => action(GET_GUILDS_IN_GAME[FAILURE], { error }),
};

export const getGuildsByUser = {
  request: () => action(GET_GUILDS_BY_USER[REQUEST], {}),
  success: (guilds) => action(GET_GUILDS_BY_USER[SUCCESS], { guilds }),
  failure: (error) => action(GET_GUILDS_BY_USER[FAILURE], { error }),
};

export const requestJoinGuild = {
  request: (guildID) => action(REQUEST_JOIN[REQUEST], { guildID }),
  success: (guildID, newRequest) => action(REQUEST_JOIN[SUCCESS], { guildID, newRequest }),
  failure: (error) => action(REQUEST_JOIN[FAILURE], { error }),
};

export const cancelJoinGuild = {
  request: (guildID) => action(CANCEL_JOIN[REQUEST], { guildID }),
  success: () => action(CANCEL_JOIN[SUCCESS], {}),
  failure: (error) => action(CANCEL_JOIN[FAILURE], { error }),
};
export const resetSendRequestStatus = () => action(RESET_SEND_REQUEST_JOIN_STATUS);

export const acceptJoinGuild = {
  request: (guildID, requestID) => action(ACCEPT_JOIN[REQUEST], { guildID, requestID }),
  success: (requestID) => action(ACCEPT_JOIN[SUCCESS], { requestID }),
  failure: (error) => action(ACCEPT_JOIN[FAILURE], { error }),
};

export const rejectJoinGuild = {
  request: (guildID, requestID) => action(REJECT_JOIN[REQUEST], { guildID, requestID }),
  success: (requestID) => action(REJECT_JOIN[SUCCESS], { requestID }),
  failure: (error) => action(REJECT_JOIN[FAILURE], { error }),
};

export const closeGuild = {
  request: (guildID) => action(CLOSE_GUILD[REQUEST], { guildID }),
  success: () => action(CLOSE_GUILD[SUCCESS], {}),
  failure: (error) => action(CLOSE_GUILD[FAILURE], { error }),
};

export const resetResultState = () => action(RESET_RESULT_STATUS);
export const resetError = () => action(RESET_ERROR);
export const setShowJoinedTab = (showJoinedTab) => action(SET_SHOW_JOINED_TAB, { showJoinedTab });
