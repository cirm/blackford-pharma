// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SocialContainer } from './socialPanel';
import ChatPanel, { EmptyContainer } from './chatPanel';
import styles from './chatDashboard.styl';
import { updateTwilioChannelDescriptors } from '../remote/remoteActionThunks';
import type { State } from '../types/State';
import type { ChannelItem, MembersItem } from '../types/Twilio';
import type { ChatMessage } from '../types/General';

type Props = {
  chatToken: string,
  identity?: string,
  sidebar: boolean,
  userList: Array<MembersItem>,
  messages: Array<ChatMessage>,
  currentChannel: ChannelItem,
  goToken: () => void,
  updateTwilioChannelDescriptors: () => void,
};

type ChatUX = {
  scrollTop?: number,
  scrollHeight: number,
  clientHeight: number,
  lastChild: ?Node,
};

class MainDashboard extends React.PureComponent<Props> {
  componentWillMount() {
    if (!this.props.identity && !this.props.chatToken) {
      this.props.goToken();
    }
    this.props.updateTwilioChannelDescriptors();
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
        : { scrollHeight: 0, clientHeight: 0, lastChild: undefined };
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
    if (chat.lastChild && chat.lastChild.id !== null) {
      this.props.currentChannel.updateLastConsumedMessageIndex(parseInt(chat.lastChild.id)).then(resp => console.log(resp))}
    //console.log(chat.children[chat.scrollTop].id)
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
  messages: state.chat.channelMessages[state.chat.currentChannel
    ? state.chat.currentChannel.sid
    : undefined] || [],
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
  updateTwilioChannelDescriptors: () => updateTwilioChannelDescriptors(),
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainDashboard);

export default DashboardContainer;
