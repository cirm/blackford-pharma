// @flow

const tokenApi: string = process.env.NODE_ENV === 'production' ? 'https://blackford.xyz' : 'http://localhost:4000';

export const getDeckerStats = (authentication: string): Promise<any> => fetch(`${tokenApi}/api/v1/decker/character`, {
  headers: {
    Accept: 'application/json',
    authentication,
  },
}).then(response => response.json());

export const getShopContent = (authentication: string): Promise<any> => fetch(`${tokenApi}/api/v1/decker/products`, {
  headers: {
    Accept: 'application/json',
    authentication,
  },
}).then(response => response.json());

export const getOrderList = (authentication: string): Promise<any> => fetch(`${tokenApi}/api/v1/decker/orders`, {
  headers: {
    Accept: 'application/json',
    authentication,
  },
}).then(response => response.json());

export const postBuyProduct = (authentication: string, product: number): Promise<any> => fetch(`${tokenApi}/api/v1/decker/products/${product}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    authentication,
  },
}).then(response => response.json());
