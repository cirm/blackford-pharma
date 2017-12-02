// @flow
import type { DecodedApiToken, DecodedTwilioToken } from '../types/General';

type jsonToken = DecodedApiToken | DecodedTwilioToken;

const urlBase64Becode = (str: string): jsonToken => {
  let output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }
  const profile: jsonToken = JSON.parse(window.atob(output));
  return profile; // polifyll https://github.com/davidchambers/Base64.js
};

const splitToken = (str: string): string => str.split('.')[1];

const decodeProfile = (str: string): jsonToken => {
  const encodedProfile = splitToken(str);
  return urlBase64Becode(encodedProfile);
};

export default decodeProfile;
