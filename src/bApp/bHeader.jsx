// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import Button from '../components/Button';
import styles from './bHeader.styl';
import type { State } from '../types/State';
import { logout } from '../remote/bRemoteActionCreators';

type props = {
  identity: ?string,
  urlPath: string,
  goIRC: () => void,
  goOptions: () => void,
  logout: () => void,
  goAvatar: () => void,
}

export class Header extends React.PureComponent<props> {
  render() {
    return (
      <div className={styles.header} >
        <p className={styles.titleText} >Blackford Evolved Pharmaceuticals</p>
        {this.props.identity && this.props.urlPath !== '/' ? <Button onClick={this.props.goIRC} > IRC </Button> : null}
        {this.props.identity && this.props.urlPath !== '/gopher' ?
          <Button > <Link to="/gopher" >Gopher</Link> </Button> : null}
        {this.props.identity && this.props.urlPath !== '/avatar' ?
          <Button onClick={this.props.goAvatar}> <Link to="/avatar" > Avatar </Link> </Button> : null}
        {this.props.identity && this.props.urlPath !== '/options' ?
          <Button onClick={this.props.goOptions} > Options </Button> : null}
        {this.props.identity ?
          <Button onClick={this.props.logout} > Log Out? </Button> : null}
      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  urlPath: state.router.location.pathname,
});

const mapDispatchToProps = {
  logout,
  goIRC: () => push('/'),
  goOptions: () => push('/options'),
  goAvatar: () => push('/avatar'),
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
