import { SET_ALERT, REMOVE_ALERT } from 'actions/actionTypes';
const initialState = {
  alerts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action] };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.id),
      };
    default:
      return state;
  }
}
