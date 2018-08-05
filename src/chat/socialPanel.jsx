// @flow
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import styles from './socialPanel.styl';
import { loadChannel } from './chatActionThunks';
import { toggleSidebar } from './chatActionCreators';
import { updateTwilioChannelDescriptors} from '../remote/remoteActionThunks';
import type { MembersItem, ChannelApiResponse, ChannelDescriptor, State } from '../types';

type ChannelsProps = {
  channels: ChannelApiResponse,
  loadChannel: (data: ChannelDescriptor) => void,
};

const Channels = (props: ChannelsProps) => (
  <div >{props.channels ? props.channels.map(channel => (
    <p
      key={channel.sid}
      onClick={() => { props.loadChannel(channel); }}
      className={styles.text}
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
  updateTwilioChannelDescriptors: () => void,
};

export const SocialPanel = (props: SocialPanelProps) => (
  <div className={styles.panelStyle}>
    {props.showChannels
      ? <Channels loadChannel={props.loadChannel} channels={props.channels} />
      : <div>
        <Button onClick={() => { props.toggleSidebar(true); props.updateTwilioChannelDescriptors() }}>Channels</Button>
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
  updateTwilioChannelDescriptors,
})(SocialPanel);
