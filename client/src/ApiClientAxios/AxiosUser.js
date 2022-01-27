const { user, userWithCredentials } = require('../utils/axios');

export const userRequest = async (method, input) => {
  switch (method) {
    case 'POST': {
      // handles both login and create user
      const state = await user
        .post('/user', input)
        .then((response) => response)
        .catch((err) => {
          err.response && console.log(err.response.data);
          err.request && console.log(err.request.data);
          console.log(err.message);
        });
      return state;
    }
    case 'GET': {
      const state = await userWithCredentials
        .get('/user', input)
        .then((response) => response)
        .catch((err) => {
          err.response && console.log(err.response.data);
          err.request && console.log(err.request.data);
          console.log(err.message);
        });
      return state;
    }
    case 'PUT': {
      const state = await userWithCredentials
        .put('/user', input)
        .then((response) => response)
        .catch((err) => {
          err.response && console.log(err.response.data);
          err.request && console.log(err.request.data);
          console.log(err.message);
        });
      return state;
    }
    case 'DELETE': {
      const state = await userWithCredentials
        .delete('/user', { data: input })
        .then((response) => response)
        .catch((err) => {
          err.response && console.log(err.response.data);
          err.request && console.log(err.request.data);
          console.log(err.message);
        });
      return state;
    }
  }
};
