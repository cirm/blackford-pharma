// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './bOptionsDashboard.styl';
import Button from '../components/Button';
import { PrivateChatForm, PublicChatForm } from './bOptionsChatForm';
import { leaveChannel } from '../bChat/bChatActionThunks';
import type { State, ChannelItem, PaginatorItem } from '../types';

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
            <p >Connected Chats</p>
            <div>{this.props.chats.map(chat =>
              (<div key={chat.sid} style={{display: 'flex', 'justifyContent': 'space-between', 'alignItems': 'baseline'}}>
                <p>
                  {chat.friendlyName} 
                </p>
                <Button 
                  onClick={() => {this.props.leaveChannel(chat.sid)}}
                >
                  leave
                </Button>
                {chat.createdBy === this.props.identity 
                  ? <small>creator</small> 
                  : null
                }
              </div>))}
            </div>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  roles: state.token.roles || [],
  chatToken: state.token.chatToken,
  chats: state.chat.channels || [],
  connectionState: state.remote.connectionState,
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
  leaveChannel,
};

const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsDashboard);

export default OptionsContainer;
