import { combineReducers } from 'redux';
import Dashboard from './reducers/dashboard_reducers';
import Emails from './reducers/email_messages_reducers';
import Messages from './reducers/sms_messages_reducers';

const reducers = combineReducers({
  Dashboard,
  Emails,
  Messages,
});

export default reducers;
