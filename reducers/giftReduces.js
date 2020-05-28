import { REQUEST, SUCCESS, FAILURE, GET_GIFTS, TAKE_GIFT } from 'actions/actionTypes';
import { giftStatuses } from 'configs/gift';

const initialState = {
  gifts: [],
  total: 0,
  per_page: 1,
  current_page: 1,
  last_page: 2,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GIFTS[REQUEST]:
      return {
        ...state,
        gifts: [],
        loading: true,
      };
    case GET_GIFTS[SUCCESS]:
      return {
        ...state,
        gifts: action.gifts,
        loading: false,
      };
    case GET_GIFTS[FAILURE]:
      return {
        ...initialState,
      };
    case TAKE_GIFT:
      return {
        ...state,
        gifts: {
          ...state.gifts.map((gift, key) => {
            if (key == action.giftID && gift.user_status == giftStatuses.qualified) {
              gift.user_status = giftStatuses.received;
            }
          }),
        },
      };
    default:
      return state;
  }
}
