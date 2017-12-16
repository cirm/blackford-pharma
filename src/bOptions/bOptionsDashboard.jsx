import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class OptionsDashboard extends React.PureComponent {
  componentWillMount() {
    if (!this.props.identity || !this.props.chatToken) {
      return this.props.dispatch(push('/token'));
    }
  }
  getChats() {
    if (!this.props.chats || !this.props.chats.state) {
      return [];
    }
    return this.props.chats.state.items;
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: '1 1 auto', color: '#28FC91' }} >
        <div >
          <div >
            <p >Create new public chat</p >
            <input type="text" />
          </div >
          <div >
            <p >Create new private chat</p >
            <input type="text" />
          </div >
        </div >
        <div >
          <p >Owned chats</p >
          <div >{this.getChats().map(chat => <p >{chat.friendlyName}</p >)}</div >
        </div >
      </div >);
  }
}

const mapStateToProps = state => ({
  identity: state.token.identity,
  chatToken: state.token.chatToken,
  chats: state.chat.channels.private,
});

const OptionsContainer = connect(mapStateToProps)(OptionsDashboard);

export default OptionsContainer;
