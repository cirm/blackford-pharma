// @flow
import React from 'react';
import type { Node } from 'react';
import styles from './app.styl';
import { HeaderContainer } from './header';


const App = ({ children }: {children: Node}) => (
  <div className={styles.cybApp}>
    <HeaderContainer />
    {children}
  </div>
);

export default App;
