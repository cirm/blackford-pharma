// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './bOptionsDashboard.styl';
import { PrivateChatForm, PublicChatForm } from './bOptionsChatForm';
import type { State } from '../types/State';
import type { ChannelItem, PaginatorItem } from '../types/Twilio';

type propTypes = {
  goToken: () => void,
  chats: PaginatorItem<ChannelItem>,
  identity: string,
  chatToken: string,
  connectionState: string,
  roles: string[],
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
    return this.props.chats[`${type}`];
  }
  isConnected() {
    return this.props.connectionState === 'connected';
  }

  render() {
    return (
      <div className={styles.dashboard}>
        { this.isConnected() ?
          <div className={styles.optionsColumn}>
            <div style={{ gridRow: 1 }}>
              <p>Create new private chat</p>
              <PrivateChatForm />
            </div>
            {this.props.roles.indexOf('admin') !== -1 ?
              <div style={{ gridRow: 2 }}>
                <p>Create new public chat</p>
                <PublicChatForm />
              </div> : null}
          </div> : null}
        <div className={styles.optionsColumn}>
          <div style={{ gridRow: 1, gridColumn: 2 }}>
            <p >Private chats</p>
            <div>{this.getChats('private').map(chat =>
              (<div key={chat.sid}><p>{chat.friendlyName} {chat.createdBy === this.props.identity ? <small>creator</small> : null}</p></div>))}
            </div>
          </div>
          <div style={{ gridColumn: 2, gridRow: 2 }}>
            <p >Public chats</p>
            <div>{this.getChats('public').map(chat => <div key={chat.sid}><p>{chat.friendlyName} {chat.createdBy === this.props.identity ? <small>creator</small> : null}</p></div>)}</div>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  roles: state.token.roles || [],
  chatToken: state.token.chatToken,
  chats: state.chat.channels,
  connectionState: state.remote.connectionState,
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
};

const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsDashboard);

export default OptionsContainer;
