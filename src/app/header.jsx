// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import Button from '../components/Button';
import styles from './header.styl';
import type { State } from '../types/State';
import { logout } from '../remote/remoteActionCreators';

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
    const {
      identity, goIRC, goAvatar, goOptions, urlPath,
    } = this.props;
    return (
      <div className={styles.header}>
        <p className={styles.titleText}>
          Blackford Evolved Pharmaceuticals
        </p>
        {identity && urlPath !== '/'
          ? (
            <Button onClick={goIRC}>
            IRC
            </Button>)
          : null}
        {identity && urlPath !== '/gopher'
          ? (
            <Button>
              <Link to="/gopher">
                Gopher
              </Link>
            </Button>)
          : null}
        {identity && urlPath !== '/avatar'
          ? (
            <Button onClick={goAvatar}>
              <Link to="/avatar">
                Avatar
              </Link>
            </Button>
          )
          : null}
        {identity && urlPath !== '/options'
          ? (
            <Button onClick={goOptions}>
              Options
            </Button>
          )
          : null}
        {identity
          ? (
            <Button onClick={this.props.logout}>
              Log Out?
            </Button>
          )
          : null}
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
