// @flow
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import styles from './bSocialPanel.styl';
import { loadChannel } from './bChatActionThunks';
import { toggleSidebar } from './bChatActionCreators';
import type { MembersItem, ChannelApiResponse, ChannelDescriptor } from '../types/Twilio';
import type { State } from '../types/State';

type ChannelsProps = {
  channels: ChannelApiResponse,
  loadChannel: (data: ChannelDescriptor) => void
};

const Channels = (props: ChannelsProps) => (
  <div >{props.channels ? props.channels.public.map(channel => (
    <p
      key={channel.sid}
      onClick={() => { props.loadChannel(channel); }}
      className={styles.text}
    >
      {channel.friendlyName}
    </p>)) : null}
    {props.channels ? props.channels.private.map(channel => (
      <p
        key={channel.sid}
        onClick={() => { props.loadChannel(channel); }}
        className={channel.lastConsumedMessageIndex !== channel.messagesCount -1 ? styles.unread : styles.text}
      >
        {channel.friendlyName}
      </p>)) : null}
  </div>);

type UsersProps = {
  userList: Array<MembersItem>,
};

const Users = (props: UsersProps) => (
  <div >
    {props.userList.map(user =>
      <p className={styles.text} key={user.identity} >{user.identity}</p>)}
  </div>);

type SocialPanelProps = {
  showChannels: boolean,
  userList: Array<MembersItem>,
  channels: ChannelApiResponse,
  loadChannel: (data: ChannelDescriptor) => void,
  toggleSidebar: (data: boolean) => void,
};

export const SocialPanel = (props: SocialPanelProps) => (
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
