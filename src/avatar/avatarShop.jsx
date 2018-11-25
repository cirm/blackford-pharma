import React from 'react';
import Button from '../components/Button';
// import { buyProduct } from './avatarActionThunks';

const shopList = ({ items, buyProduct }) => (items.length ? (
  <React.Fragment>
    {items.map(item => (
      <div style={{ margin: '10px' }} key={item.id}>
        <Button
          disabled={!item.canBuy}
          onClick={() => {
            buyProduct(item.id);
          }}
        >
          Buy me
        </Button>
        {`${item.name}`}
        {` - cost: ${item.value} credit(s)`}
      </div>
    ))}
  </React.Fragment>
) : (
  <div>
    The Shop is Empty?
  </div>
));

export default shopList;
