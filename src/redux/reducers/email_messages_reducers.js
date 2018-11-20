import { SEND_EMAIL_ALERT_MESSAGE } from '../constants/constants';

const Emails = (state = { emails: [] }, action) => {
  switch (action.type) {
    case SEND_EMAIL_ALERT_MESSAGE:
      return Object.assign({}, state, {
        emails: [...state.emails, action.payload],
      });
    default:
      return state;
  }
};

export default Emails;
