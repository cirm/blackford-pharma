import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from './tokenForm';


export class Login extends React.PureComponent {
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

  render() {
    return (<LoginForm dispatch={this.props.dispatch} />);
  }
}

const mapStateToProps = state => ({
  identity: state.token.identity,
});

export const LoginDashboard = connect(mapStateToProps)(Login);
