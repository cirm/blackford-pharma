import React from 'react';
import moment from 'moment';
import * as _ from 'lodash/fp';
import styles from './bChatTextArea.styl';

moment.locale('et');

const renderChatBox = props => (
  <div ref={props.inputRef} className={styles.chatStyle}>
    {props.messages ? props.messages.items.map(message => (
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
    )) : null}
  </div>);

export default renderChatBox;
