import { action, REQUEST, SUCCESS, FAILURE, GET_GIFTS, TAKE_GIFT } from './actionTypes';

export const getGifts = {
  request: (gameID, guildID) => action(GET_GIFTS[REQUEST], { gameID, guildID }),
  success: (gifts) => action(GET_GIFTS[SUCCESS], { gifts }),
  failure: (error) => action(GET_GIFTS[FAILURE], { error }),
};

export const takeGift = (giftID) => action(TAKE_GIFT, { giftID });
