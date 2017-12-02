import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import styles from './bHeader.styl';


export class Header extends React.PureComponent {
  constructor() {
    super();
    this.triggerLogout = this.triggerLogout.bind(this);
    this.goOptions = this.goOptions.bind(this);
    this.goIRC = this.goIRC.bind(this);
  }

  triggerLogout() {
    this.props.dispatch({ type: 'LOGOUT', meta: { chat: true } });
  }

  goOptions() {
    this.props.dispatch(push('/options'));
  }

  goIRC() {
    this.props.dispatch(push('/'));
  }

  render() {
    return (
      <div className={styles.header} >
        <p className={styles.titleText} >Blackford Evolved Pharmaceuticals</p >
        {this.props.identity && this.props.urlPath !== '/' ? <Button onClick={this.goIRC} > IRC </Button > : null}
        {this.props.identity && this.props.urlPath !== '/gopher' ?
          <Button > <Link to="/gopher" >Gopher</Link > </Button > : null}
        {this.props.identity && this.props.urlPath !== '/avatar' ?
          <Button > <Link to="/avatar" >Avatar</Link > </Button > : null}
        {this.props.identity && this.props.urlPath !== '/options' ?
          <Button onClick={this.goOptions} > Options </Button > : null}
        {this.props.identity ?
          <Button onClick={this.triggerLogout} > Log Out? </Button > : null}
      </div >);
  }
}

Header.defaultProps = {
  display: '',
};

Header.propTypes = {
  display: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    identity: state.token.identity,
    urlPath: state.router.location.pathname,
  };
}

export const HeaderContainer = connect(
  mapStateToProps,
)(Header);
