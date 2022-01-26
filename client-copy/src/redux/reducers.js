import { combineReducers } from 'redux';

const user = (state = {}, action) => {
  switch (action.type) {
    case 'login': {
      return action.userInfo;
    }
    case 'register': {
      return action.userInfo;
    }
    // for update we will need to be sure that the form the user fills in with the fields to be updated by default has the current user's state as value of the inputs, so when user modifies only the fields they wish to update, a whole new instance of the user with all fields filled in will be passed as an object to the updating function.
    case 'update': {
      return action.update;
    }
    case 'delete': {
      //return empty object for user? or whatever the delete controller sends back?
      return action.credentials;
    }
    default:
      return state;
  }
};

const shops = (state = [], action) => {
  switch (action.type) {
    case 'create': {
      return actioin.shopDetails;
    }
    case 'update': {
      return action.shopDetails;
    }
    case 'delete': {
      return action.deleteInfo;
    }
    case 'search': {
      return action.searchInfo;
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  user,
  shops,
});
export default reducers;
