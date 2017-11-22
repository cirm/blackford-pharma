import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import styles from './bChatInput.styl';

let dispatch;
let channel;

const logField = (input) => {
  channel.sendMessage(input.text);
  dispatch(reset('ChatForm'));
};

const renderInput = field => ( // Define stateless component to render input and errors
  <div className={styles.formStyle}>
    <input className={styles.formStyle} {...field.input} type={field.type} />
    {
      field.meta.touched &&
      field.meta.error &&
      <span className="error"> {field.meta.error} </span>
    }
  </div>);

const chatForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  channel = props.channel;
  dispatch = props.dispatch;
  return (
    <form className={styles.formStyle} onSubmit={handleSubmit(logField)}>
      <div className={styles.inputStyle}>
        <Field name="text" type="text" label="chat" component={renderInput} />
      </div>
      <div className={styles.buttonStyle}>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

chatForm.propTypes = {
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'ChatForm',
})(chatForm);
