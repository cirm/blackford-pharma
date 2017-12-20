// @flow
import React from 'react';
import moment from 'moment';
import * as _ from 'lodash/fp';
import styles from './bChatTextArea.styl';
import type { MessageItem } from '../../types/Twilio';

moment.locale('et');

type propTypes = {
  messages: Array<MessageItem>,
  inputRef: (el: ?HTMLDivElement) => void,
}

const renderChatBox = (props: propTypes) => (
  <div ref={props.inputRef} className={styles.chatStyle}>
    {props.messages.map(message => (
      <div className={styles.lineStyle} key={_.uniqueId('chatMessage_')}>
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
