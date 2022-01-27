const { shop } = require('../utils/axios');

export const shopRequest = async (method, input) => {
  switch (method) {
    case 'POST': {
      // createShop
      const state = await shop
        .post('/shop', input)
        .then((response) => response)
        .catch((err) => {
          err.response
            ? console.log('RESPONSE ERROR: ', err)
            : err.request
            ? console.log('REQUEST ERROR: ', err)
            : console.log(err);
        });
      return state;
    }
    case 'PUT': {
      const state = await shop
        .put('/shop', input)
        .then((response) => response)
        .catch((err) => {
          err.response && console.log(err.response.data);
          err.request && console.log(err.request.data);
          console.log(err.message);
        });
      return state;
    }
    case 'DELETE': {
      // ask for email and password
      // shopId
      const state = await shop
        // in the front end pass id, username, password
        .delete('/shop', { data: input })
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
