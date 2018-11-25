import React from 'react';

const order_headers = ['id', 'ammount', 'wallet_statement', 'upgrade_id', 'status'];
const orderMap = {
  id: 'Order ID',
  timestamp: 'Date',
  ammount: 'Cost',
  wallet_statement: 'Balance before',
  upgrade_id: 'Item ID',
  decker_id: 'Buyer',
  status: 'Order Status',
};

const tableStyle = {
  border: '1px solid #ff0022',
  borderCollapse: 'collapse',
  color: '#28fc91',
  white: '#f8f9fa',
};

const orderList = ({ orders }) => (orders.length ? (
  <React.Fragment>
    <table style={{ ...tableStyle, width: '100%' }}>
      <tr>
        {order_headers.map(header => (
          <th style={tableStyle}>
            {orderMap[header]}
          </th>
        ))}
      </tr>
      {orders.map(order => (
        <tr>
          {order_headers.map(header => (
            <td style={tableStyle}>
              {order[header]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  </React.Fragment>
) : (
  <div>
    No existing orders for this Decker
  </div>
));

export default orderList;
