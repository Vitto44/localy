import { userRequest } from '../ApiClientAxios/AxiosUser';

export const login = (payload) => {
  return async (dispatch, getState) => {
    const user = await userRequest('POST', payload);
    dispatch({
      type: 'login',
      userInfo: user.data,
    });
  };
};
export const register = (payload) => {
  return async (dispatch, getState) => {
    const user = await userRequest('POST', payload);
    dispatch({
      type: 'register',
      userIfo: user.data,
    });
  };
};

export const updateUser = (payload) => {
  return async (dispatch, getState) => {
    const user = await userRequest('PUT', payload);
    dispatch({
      type: 'updateUser',
      update: user.data,
    });
  };
};

export const deleteUser = (payload) => {
  return {
    type: 'deleteUser',
    credentials: payload,
  };
};
