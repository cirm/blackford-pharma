import React from 'react';
import Button from '../components/Button';
import { connect } from 'react-redux';
import styles from './bSocialPanel.styl';
import { loadChannel } from './bChatActionThunks';
import { toggleSidebar } from './bChatActionCreators';

const Channels = props => (
  <div>
  <div>{console.log(props.channelList)}</div>
  <div >{props.channelList.private.state.items.map(channel => (<p
    onClick={() => {props.loadChannel(channel)}}
    className={styles.text}
  >{channel.friendlyName}
  </p >))}
  </div ></div>);

const Users = props => (
  <div >
    {props.userList.map(user =>
      <p className={styles.text} >{user.identity}</p >)}
  </div >);

export const SocialPanel = props => (
  <div style={{
    flex: '1 1 auto', border: '1px solid #28FC91', margin: '5px 5px 5px', padding: '5px',
  }}
  >
    {props.showChannels
      ? <Channels loadChannel={props.loadChannel} channelList={props.channelList || []} />
      : <div ><Button onClick={() => {props.toggleSidebar(true)}}
      >Channels
      </Button >
        <Users
          userList={props.userList}
        />
      </div >}
  </div >
);

const mapPropsToState = (state) => ({
  sidebar: state.chat.sidebar,
  userList: state.chat.userList,
  channels: state.chat.channels,
})

export const SocialContainer = connect(mapPropsToState, {
  loadChannel,
  toggleSidebar,
})(SocialPanel);
