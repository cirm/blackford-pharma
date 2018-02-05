// @flow
import React from 'react';
import styles from './bChatTextArea.styl';
import type { ChatMessage } from '../../types/General';

const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Europe/Tallinn' };

type propTypes = {
  messages: Array<ChatMessage>,
  inputRef: (el: ?HTMLDivElement) => void,
}

const renderChatBox = (props: propTypes) => (
  <div ref={props.inputRef} className={styles.chatStyle}>
    {props.messages.map(message => (
      <div className={styles.lineStyle} key={message.sid} id={message.index}>
        <div className={styles.timeStamp}>
          {`[${message.timestamp.toLocaleTimeString('et-EE', options)}] `}
        </div>
        <div style={{ color: '#FFDC28' }}>
          {`<${message.author}> `}
        </div>
        <div>
          {`${message.body}`}
        </div>
      </div>
    ))}
  </div>);

export default renderChatBox;
