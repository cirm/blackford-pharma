// @flow

export const newMessage = (message: string) => ({
  type: 'NEW_MESSAGE',
  data: message,
});
