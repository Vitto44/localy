import { shopRequest } from '../ApiClientAxios/AxiosShop';

export const createShop = (payload) => {
  return async (dispatch, getState) => {
    const shop = await shopRequest('POST', payload);
    dispatch({
      type: 'create',
      shopDetails: shop.data,
    });
  };
};

export const updateShop = (payload) => {
  return async (dispatch, getState) => {
    const shop = await shopRequest('PUT', payload);
    dispatch({
      type: 'update',
      shopDetails: shop.data,
    });
  };
};

export const deleteShop = (payload) => {
  return async (dispatch, getState) => {
    const shop = await shopRequest('DELETE', payload);
    dispatch({
      type: 'delete',
      deleteInfo: shop.data,
    });
  };
};

export const searchShops = (payload) => {
  return async (dispatch, getState) => {
    const shops = await shopRequest('GET', payload);
    dispatch({
      type: 'search',
      searchInfo: shops.data,
    });
  };
};
