import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './bAvatarDashboard.styl';
import renewAvatar from './avatarActionThunks'
import Button from '../components/Button';
import type { State, ChannelItem, PaginatorItem } from '../types';

type propTypes = {
  goToken: () => void,
  identity: string,
  connectionState: string,
};

export class AvatarDashboard extends React.PureComponent<propTypes> {
  componentWillMount() {
    if (!this.props.identity) {
      return this.props.goToken();
    }
    this.props.renewAvatar();
  }

  isConnected() {
    return this.props.connectionState === 'connected';
  }

  render() {
    return (
      <div style={{color: 'red'}}>
        { this.isConnected() ?
       (<div> {Object.keys(this.props.avatar).map(key => (<p>{key}: {this.props.avatar[key]}</p>))}
          <Button onClick={this.props.renewAvatar}> Renew</Button></div>)
                  : null
                }
         
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  connectionState: state.remote.connectionState,
  avatar: state.avatar,
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
  renewAvatar: () => renewAvatar(),
};

export const AvatarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarDashboard);
