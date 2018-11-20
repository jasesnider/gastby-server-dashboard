import { SEND_SMS_ALERT_MESSAGE } from '../constants/constants';

const Messages = (state = { messages: [] }, action) => {
  switch (action.type) {
    case SEND_SMS_ALERT_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload],
      });
    default:
      return state;
  }
};

export default Messages;
