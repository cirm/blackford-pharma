// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as styles from './bOptionsDashboard.styl';
import { PrivateChatForm, PublicChatForm } from './bOptionsChatForm';
import type { State } from '../types/State';
import type { ChannelItem, PaginatorItem } from '../types/Twilio';

type propTypes = {
  goToken: () => void,
  chats: PaginatorItem<ChannelItem>,
  identity: string,
  chatToken: string,
  connectionState: string,
};

class OptionsDashboard extends React.PureComponent<propTypes> {
  componentWillMount() {
    if (!this.props.identity || !this.props.chatToken) {
      return this.props.goToken();
    }
  }
  getChats(type: string): Array<ChannelItem> {
    if (!this.props.chats) {
      return [];
    }
    console.log(this.props.chats[`${type}`].items);
    return this.props.chats[`${type}`].items;
  }
  isConnected() {
    return this.props.connectionState === 'connected';
  }

  render() {
    return (
      <div className={styles.dashboard}>
        { this.isConnected() ?
          <div>
            <div>
              <p>Create new public chat</p>
              <PublicChatForm />
            </div>
            <div>
              <p>Create new private chat</p>
              <PrivateChatForm />
            </div>
          </div> : null}
        <div>
          <div>
            <p >Owned chats</p>
            <div>{this.getChats('private').map(chat => <p key={chat.sid}>{chat.friendlyName}</p>)}</div>
          </div>
          <div>
            <p >Joined chats</p>
            <div>{this.getChats('public').map(chat => <p key={chat.sid}>{chat.friendlyName}</p>)}</div>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  chatToken: state.token.chatToken,
  chats: state.chat.channels,
  connectionState: state.chat.connectionState,
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
};

const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsDashboard);

export default OptionsContainer;
