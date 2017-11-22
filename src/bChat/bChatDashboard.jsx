import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SocialPanel } from './bSocialPanel';
import ChatPanel, { EmptyContainer } from './bChatPanel';
import { connectTwilioClient } from './bChatActionCreators';

class MainDashboard extends React.PureComponent {
  componentWillMount() {
    if (!this.props.identity || !this.props.chatToken) {
      this.props.dispatch(push('/token'));
    }
    if (this.props.chatToken) {
      this.props.dispatch(connectTwilioClient(this.props.chatToken));
    }
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.messages.items.length !== this.props.messages.items.length;
    if (this.historyChanged) {
      const chat = this.bChatTextArea;
      const scrollPos = chat.scrollTop;
      this.scrollAtBottom = scrollPos === (chat.scrollHeight - chat.clientHeight);
    }
  }

  componentDidUpdate() {
    if (!this.props.identity || !this.props.chatToken) {
      this.props.dispatch(push('/token'));
      this.historyChanged = false;
    }
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
    }
  }

  scrollToBottom() {
    const chat = this.bChatTextArea;
    chat.scrollTop = chat.scrollHeight;
  }


  render() {
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        {this.props.currentChannel ? <ChatPanel
          channel={this.props.currentChannel}
          messages={this.props.messages}
          inputRef={(el) => {
            this.bChatTextArea = el;
          }}
        /> : <EmptyContainer identity={this.props.identity} />
        }
        <SocialPanel
          dispatch={this.props.dispatch}
          userList={this.props.userList}
          showChannels={this.props.sidebar}
          channelList={this.props.channels}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  identity: state.token.identity,
  chatToken: state.token.chatToken,
  sidebar: state.chat.sidebar,
  userList: state.chat.userList,
  channels: state.chat.channels,
  currentChannel: state.chat.currentChannel,
  messages: state.chat.messages,
});

const DashboardContainer = connect(mapStateToProps)(MainDashboard);

export default DashboardContainer;
