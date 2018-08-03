// @flow

const tokenApi: string = process.ENV === 'production' ? 'fixme' : 'http://localhost:4000';

export const getDeckerStats = (authentication: string): Promise<any> =>
  fetch(`${tokenApi}/api/v1/decker/character`, {
    headers: {
			Accept: 'application/json',
			authentication,
    },
  }).then(response => response.json());