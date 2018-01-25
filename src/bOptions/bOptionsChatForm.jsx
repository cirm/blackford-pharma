import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { createTwilioChannel } from '../remote/bRemoteActionThunks';

const renderInput = field => (
  <div>
    <input {...field.input} type={field.type} label={field.label} />
    {field.meta.touched &&
	field.meta.error &&
	<span className="error" >{field.meta.error}</span>}
  </div>
);

const chatForm = (props) => {
  const {
    handleSubmit, dispatch, type, form,
  } = props;
  return (
    <form onSubmit={handleSubmit((val) => {
      dispatch(createTwilioChannel({ channelName: val.createChat, isPublic: type === 'public' }));
      dispatch(reset(form));
    })}
    >
      <Field name="createChat" component={renderInput} type="text" label="createChat" />
    </form>);
};


export const PrivateChatForm = reduxForm({
  form: 'createPrivateChat',
  type: 'private',
})(chatForm);

export const PublicChatForm = reduxForm({
  form: 'createPublicChat',
  type: 'public',
})(chatForm);
