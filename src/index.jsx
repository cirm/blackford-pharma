import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { getStore, history } from './store';
import App from './bApp/bApp';
import DashboardContainer from './bChat/bChatDashboard';
import { LoginDashboard } from './bToken/bTokenDashboard';


require('./fonts/ahamono.styl');

const store = getStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component>
            <Route path="/" exact component={DashboardContainer} />
            <Route path="/token" exact component={LoginDashboard} />
          </Component>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./bApp/bApp', () => {
    render();
  });
}
