// @flow
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import styles from './bSocialPanel.styl';
import loadChannel from './bChatActionThunks';
import { toggleSidebar } from './bChatActionCreators';
import type { State } from '../types/State';

const Channels = props => (
  <div >{props.channels ? props.channels.public.items.map(channel => (
    <p
      key={channel.sid}
      onClick={() => { props.loadChannel(channel); }}
      className={styles.text}
    >
      {channel.friendlyName}
    </p>)) : null}
    {props.channels ? props.channels.private.items.map(channel => (
      <p
        key={channel.sid}
        onClick={() => { props.loadChannel(channel); }}
        className={styles.text}
      >
        {channel.friendlyName}
      </p>)) : null}
  </div>);

const Users = props => (
  <div >
    {props.userList.map(user =>
      <p className={styles.text} key={user.identity} >{user.identity}</p>)}
  </div>);

export const SocialPanel = props => (
  <div className={styles.panelStyle}>
    {props.showChannels
      ? <Channels loadChannel={props.loadChannel} channels={props.channels} />
      : <div>
        <Button onClick={() => { props.toggleSidebar(true); }}>Channels</Button>
        <Users userList={props.userList} />
      </div>}
  </div>
);

const mapPropsToState = (state: State) => ({
  sidebar: state.chat.sidebar,
  userList: state.chat.userList,
  channels: state.chat.channels,
});

export const SocialContainer = connect(mapPropsToState, {
  loadChannel,
  toggleSidebar,
})(SocialPanel);
