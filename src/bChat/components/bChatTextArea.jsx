// @flow
import React from 'react';
import moment from 'moment';
import styles from './bChatTextArea.styl';
import type { ChatMessage } from '../../types/General';

moment.locale('et');

type propTypes = {
  messages: Array<ChatMessage>,
  inputRef: (el: ?HTMLDivElement) => void,
}

const renderChatBox = (props: propTypes) => (
  <div ref={props.inputRef} className={styles.chatStyle}>
    {props.messages.map(message => (
      <div className={styles.lineStyle} key={message.sid}>
        <div className={styles.timeStamp}>
          {`[${moment(message.timestamp).format('LTS')}] `}
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
