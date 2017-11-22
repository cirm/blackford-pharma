import React from 'react';
import ChatInput from './components/bChatInput';
import ChatText from './components/bChatTextArea';
import styles from './bChatPanel.styl';

const chatContainer = props => (
  <div
    className={styles.chat__container}
  >
    <ChatText channel={props.channel} messages={props.messages} inputRef={props.inputRef} />
    <ChatInput channel={props.channel} />
  </div >
);

export const EmptyContainer = props => (
  <div className={styles.chat__container} style={{ color: 'red' }} >
    Welcome, {props.identity}! Pick a Channel to Join -->>
  </div >);

export default chatContainer;
