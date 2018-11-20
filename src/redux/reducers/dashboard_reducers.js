import { CREATE_NEW_SERVER } from '../constants/constants';

const Dashboard = (state = { servers: [] }, action) => {
  switch (action.type) {
    case CREATE_NEW_SERVER:
      return Object.assign({}, state, {
        servers: [...state.servers, action.payload],
      });
    default:
      return state;
  }
};

export default Dashboard;
