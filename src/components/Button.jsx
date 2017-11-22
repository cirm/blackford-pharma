import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.styl';

const button = props => (
  <button className={styles.button} onClick={props.onClick} >{props.children}</button>
);

button.defaultProps = {
  onClick: () => undefined,
};

button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node]).isRequired,
};

export default button;
