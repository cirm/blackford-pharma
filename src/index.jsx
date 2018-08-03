import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { getStore, history } from './store';
import App from './bApp/bApp';
import { hot } from 'react-hot-loader'
import DashboardContainer from './bChat/bChatDashboard';
import { LoginDashboard } from './bToken/bTokenDashboard';
import OptionsDashboard from './bOptions/bOptionsDashboard';
import { AvatarContainer } from './bAvatar/bAvatarDashboard';


require('./fonts/ahamono.styl');

const store = getStore();

const render = (Component) => {
  ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component>
            <Route path="/" exact component={DashboardContainer} />
            <Route path="/token" exact component={LoginDashboard} />
            <Route path="/options" exact component={OptionsDashboard} />
            <Route path="/avatar" exact component={AvatarContainer} />
          </Component>
        </ConnectedRouter>
      </Provider>,
    document.getElementById('app'),
  );
};

hot(module)(render(App));


