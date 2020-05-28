import { action, SET_ALERT, REMOVE_ALERT, GENERATE_ALERT } from './actionTypes';

export const alert = {
  generate: (msg, alertType) => action(GENERATE_ALERT, { msg, alertType }),
  set: (msg, alertType, id) => action(SET_ALERT, { msg, alertType, id }),
  remove: (id) => action(REMOVE_ALERT, { id }),
};
