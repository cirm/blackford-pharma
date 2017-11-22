import React from 'react';
import PropTypes from 'prop-types';
import styles from './bApp.styl';
import { HeaderContainer } from './bHeader';

const App = props => (
  <div className={styles.cybApp}>
    <HeaderContainer />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
