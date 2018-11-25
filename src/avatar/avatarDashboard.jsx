// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './avatarDashboard.styl';
import {
  renewAvatar, renewOrders, renewShop, buyProduct,
} from './avatarActionThunks';
import Button from '../components/Button';
import OrderList from './avatarOrders';
import ShopList from './avatarShop';
import type { State } from '../types/State';

type propTypes = {
  goToken: () => void,
  identity: string,
  chatToken: string,
  connectionState: string,
  renewAvatar: () => void,
  renewOrders: () => void,
  renewShop: () => void,
};

export class AvatarDashboard extends React.PureComponent<propTypes> {
  componentWillMount() {
    const {
      identity, chatToken, goToken, renewAvatar, renewOrders, renewShop,
    } = this.props;
    if (!identity || !chatToken) {
      goToken();
    } else {
      renewAvatar();
      renewOrders();
      renewShop();
    }
  }

  componentWillReceiveProps({ identity, chatToken }) {
    if (!identity || !chatToken) {
      this.props.goToken();
    }
  }

  render() {
    const {
      decker, connectionState, renewAvatar, buyProduct, renewOrders, renewShop, orders, shop,
    } = this.props;
    return (
      <div className={styles.dashboard}>
        { connectionState
          ? (
            <React.Fragment>
              <div className={styles.dashboardItem} style={{ gridColumn: 1 }}>
                {Object.keys(decker).map(key => (
                  <p key={key}>
                    {`${key}:${decker[key]}`}
                  </p>
                ))}
                <Button onClick={renewAvatar}>
                Renew Stats
                </Button>
              </div>
              <div className={styles.dashboardItem} style={{ gridColumn: 2, gridRow: 1 / -1 }}>
                <OrderList orders={orders} />
                <Button onClick={renewOrders}>
                Renew Orders
                </Button>
              </div>
              <div className={styles.dashboardItem} style={{ gridColumn: 1 }}>
                <ShopList items={shop} buyProduct={buyProduct} />
                <Button onClick={renewShop}>
                Renew Shop
                </Button>
              </div>
            </React.Fragment>
          )
          : null
                }

      </div>);
  }
}

const mapStateToProps = (state: State) => ({
  identity: state.token.identity,
  connectionState: state.remote.connectionState,
  decker: state.avatar.decker,
  shop: state.avatar.shop,
  orders: state.avatar.orders,
  chatToken: state.token.chatToken,
});

const mapDispatchToProps = {
  goToken: () => push('/token'),
  renewAvatar: () => renewAvatar(),
  renewShop: () => renewShop(),
  renewOrders: () => renewOrders(),
  buyProduct: id => buyProduct(id),
};

export const AvatarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarDashboard);
