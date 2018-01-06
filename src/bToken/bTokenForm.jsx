import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '../components/Button';
import fetchAccessTokens from './bTokenActionThunks';
import styles from './formStyle.styl';

const renderInput = field => (
  <div >
    <input {...field.input} type={field.type} label={field.label} />
    {field.meta.touched &&
    field.meta.error &&
    <span className="error" >{field.meta.error}</span >}
  </div >
);

const triggerLogin = (values, dispatch) => {
  dispatch(fetchAccessTokens(values));
  dispatch(push('/'));
};

const loginForm = (props) => {
  const {
    handleSubmit, pristine, reset, submitting, dispatch,
  } = props;
  return (
    <div className={styles.body} >
      <p >Pick your handle Cowboy!</p >
      <form className={styles.form} onSubmit={handleSubmit(val => triggerLogin(val, dispatch))} >
        <Field name="username" component={renderInput} type="text" label="username" />
        <Field name="password" component={renderInput} type="password" label="password" />
        <div className={styles.formButtons} >
          <Button
            type="submit"
            disabled={pristine || submitting}
          >Submit
          </Button >
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset
          </Button >
        </div >
      </form >
    </div >
  );
};

loginForm.propTypes = {
  dispatch: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

const LoginForm = reduxForm({
  form: 'loginForm',
})(loginForm);

export default LoginForm;
