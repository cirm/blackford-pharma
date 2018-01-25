// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SocialContainer } from './bSocialPanel';
import ChatPanel, { EmptyContainer } from './bChatPanel';
import * as styles from './bChatDashboard.styl';
import { updateTwilioChannels } from '../remote/bRemoteActionThunks';
import type { State } from '../types/State';
import type { MessageItem, ChannelItem, MembersItem } from '../types/Twilio';
import type { ChatMessage } from '../types/General';

type Props = {
  chatToken: string,
  identity?: string,
  sidebar: boolean,
  userList: Array<MembersItem>,
  messages: Array<ChatMessage>,
  currentChannel: ChannelItem,
  goToken: () => void,
  updateTwilioChannels: () => void,
};

type ChatUX = {
  scrollTop?: number,
  scrollHeight: number,
  clientHeight: number,
};

class MainDashboard extends React.PureComponent<Props> {
  componentWillMount() {
    if (!this.props.identity && !this.props.chatToken) {
      this.props.goToken();
    }
    this.props.updateTwilioChannels();
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = false;
    if (nextProps.messages) {
      this.historyChanged = this.props.messages
        ? nextProps.messages.length !== this.props.messages.length
        : true;
    }
    if (this.historyChanged) {
      const chat: ChatUX = this.bChatTextArea
        ? this.bChatTextArea
        : { scrollHeight: 0, clientHeight: 0 };
      const scrollPos = chat.scrollTop;
      this.scrollAtBottom = scrollPos === (chat.scrollHeight - chat.clientHeight);
    }
  }

  componentDidUpdate() {
    if (!this.props.identity || !this.props.chatToken) {
      this.props.goToken();
      this.historyChanged = false;
    }
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
    }
  }

  historyChanged: boolean;
  bChatTextArea: ?ChatUX;
  scrollAtBottom: boolean;

  scrollToBottom() {
    const chat = this.bChatTextArea ? this.bChatTextArea : {};
    chat.scrollTop = chat.scrollHeight;
  }


  render() {
    return (
      <div className={styles.chat__container}>
        {this.props.currentChannel ? <ChatPanel
          channel={this.props.currentChannel}
          messages={this.props.messages}
          inputRef={(el: ?HTMLDivElement) => {
            this.bChatTextArea = el;
          }}
        /> : <EmptyContainer identity={this.props.identity} />
        }
        <SocialContainer
          userList={this.props.userList}
          showChannels={this.props.sidebar}
        />
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  chatToken: state.token.chatToken,
  sidebar: state.chat.sidebar,
  userList: state.chat.userList,
  currentChannel: state.chat.currentChannel,
  messages: state.chat.channelMessages[state.chat.currentChannel ? state.chat.currentChannel.sid : undefined] || [],
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
  updateTwilioChannels: () => updateTwilioChannels(),
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainDashboard);

export default DashboardContainer;
