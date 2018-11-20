import {
  SEND_SMS_ALERT_MESSAGE,
  SEND_EMAIL_ALERT_MESSAGE,
  CREATE_NEW_SERVER,
} from '../constants/constants';

export const sendSMSAlertMessage = message => {
  return {
    type: SEND_SMS_ALERT_MESSAGE,
    payload: message,
  };
};

export const sendEmailAlertMessage = message => {
  return {
    type: SEND_EMAIL_ALERT_MESSAGE,
    payload: message,
  };
};

export const createNewServer = server => {
  return {
    type: CREATE_NEW_SERVER,
    payload: server,
  };
};
