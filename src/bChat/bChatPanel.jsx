// @flow
import React from 'react';
import ChatInput from './components/bChatInput';
import ChatText from './components/bChatTextArea';
import styles from './bChatPanel.styl';
import type { MessageItem, ChannelItem } from '../types/Twilio';

type Props = {
  channel: ChannelItem,
  messages: Array<MessageItem>,
  inputRef: (el: ?HTMLDivElement) => void,
};

const chatContainer = (props: Props) => (
  <div
    className={styles.chat__panel}
  >
    <ChatText channel={props.channel} messages={props.messages} inputRef={props.inputRef} />
    <ChatInput channel={props.channel} />
  </div>
);

type EmptyProps = {
  identity: string,
}

export const EmptyContainer = (props: EmptyProps) => (
  <div className={styles.chat__container} style={{ color: 'red' }} >
    Welcome, {props.identity}! Pick a Channel to Join --&gt;&gt;
  </div>);

export default chatContainer;
