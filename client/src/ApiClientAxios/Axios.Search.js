const { search } = require('../utils/axios');

export const searchRequest = async (input) => {
  const state = await search
    .get('/search', input)
    .then((response) => response)
    .catch((err) => {
      err.response && console.log(err.response.data);
      err.request && console.log(err.request.data);
      console.log(err.message);
    });
  return state;
};
