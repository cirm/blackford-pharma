import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from './bTokenForm';
import { fetchAccessTokens } from './bTokenActionThunks';


export class Login extends React.PureComponent {
  constructor() {
    super();
    this.triggerLogin = this.triggerLogin.bind(this);
  }

  componentWillMount() {
    if (this.props.identity) {
      this.props.dispatch(push('/'));
    }
  }

  componentWillUpdate() {
    if (this.props.identity) {
      this.props.dispatch(push('/'));
    }
  }

  triggerLogin(values) {
    this.props.dispatch(fetchAccessTokens(values));
  }

  render() {
    return (<LoginForm dispatch={this.props.dispatch} />);
  }
}

const mapStateToProps = state => ({
  identity: state.token.identity,
});

export const LoginDashboard = connect(mapStateToProps)(Login);
