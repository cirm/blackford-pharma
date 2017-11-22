import React from 'react';
import Button from '../components/Button';
import styles from './bSocialPanel.styl';
import { loadChannel } from './bChatActionThunks';

const Channels = props => (
  <div >{props.channelList.private.items.map(channel => (<p
    onClick={() => {
      props.dispatch(loadChannel(channel));
    }}
    className={styles.text}
  >{channel.friendlyName}
  </p >))}
  </div >);

const Users = props => (
  <div >
    {props.userList.map(user =>
      <p className={styles.text} >{user.identity}</p >)}
  </div >);

export const SocialPanel = props => (
  <div style={{
    flex: '1 1 10%', border: '1px solid #28FC91', margin: '5px 5px 5px', padding: '5px',
  }}
  >
    {props.showChannels
      ? <Channels dispatch={props.dispatch} channelList={props.channelList || []} />
      : <div ><Button onClick={() => {
        props.dispatch({ type: 'TOGGLE_SIDEBAR', data: true });
      }}
      >Channels
      </Button >
        <Users
          userList={props.userList}
        />
      </div >}
  </div >
);
