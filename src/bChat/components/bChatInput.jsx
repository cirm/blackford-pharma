import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { inviteUsers2Channel, unkCommand, kickUsersFromChannel, leaveChannel } from '../bChatActionThunks';
import styles from './bChatInput.styl';

let dispatch;
let channel;

const logField = (input) => {
  if (/\/\w+\s.*/.test(input.text)) {
    const command = input.text.split(' ');
    if (command[0] === '/invite') {
      dispatch(inviteUsers2Channel(command.slice(1)));
    } else if (command[0] === '/kick') {
      dispatch(kickUsersFromChannel(command.slice(1)));
    } else {
      dispatch(unkCommand());
    }
  } else if (/\/\w+/.test(input.text)) {
    if (input.text === '/leave') {
      dispatch(leaveChannel());
    } else { 
      dispatch(unkCommand())
    }
  } else {
    channel.sendMessage(input.text);
  }
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

export default reduxForm({
  form: 'ChatForm',
})(chatForm);
