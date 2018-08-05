// @flow
import React from 'react';
import ChatInput from './components/chatInput';
import ChatText from './components/chatTextArea';
import styles from './chatPanel.styl';
import type { ChannelItem } from '../types/Twilio';
import type { ChatMessage } from '../types/General';

type Props = {
  channel: ChannelItem,
  messages: Array<ChatMessage>,
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
  <div className={styles.empty__container} >
    Welcome, {props.identity}! Pick a Channel to Join --&gt;&gt;
  </div>);

export default chatContainer;
