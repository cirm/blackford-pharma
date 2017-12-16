// @flow
import React from 'react';
import type { Node } from 'react';
import styles from './bApp.styl';
import { HeaderContainer } from './bHeader';

type Props = {
  children: Node,
};

const App = (props: Props) => (
  <div className={styles.cybApp}>
    <HeaderContainer />
    {props.children}
  </div>
);

export default App;
