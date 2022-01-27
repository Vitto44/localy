const axios = require('axios').default;
const baseURL = 'http://localhost:3001';

// instance of axios to be used in "shopRequest"
const shop = axios.create({
  baseURL,
  withCredentials: true,
});

const user = axios.create({
  baseURL,
});

const userWithCredentials = axios.create({
  baseURL,
  withCredentials: true,
});

const search = axios.create({
  baseURL,
});

module.exports = {
  shop,
  user,
  userWithCredentials,
  search,
};
