const chai = require('chai');

const { assert } = chai;

const {
  takeOrder,
  refundOrder,
  listItems,
  searchOrder,
} = require('../src/order');

describe('order.js', () => {
  describe('takeOrder', () => {
    it('should be a function', () => {
      assert.isFunction(takeOrder);
    });

    it('should add new orders to an order type list', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [];

      takeOrder(order1, deliveryOrders);
      takeOrder(order2, deliveryOrders);

      assert.equal(deliveryOrders[0], order1);
      assert.equal(deliveryOrders[1], order2);
    });

    it('should add another order to an order type list', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order3 = {
        orderNumber: 3,
        item: 'rueben',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [order1];

      takeOrder(order2, deliveryOrders);
      takeOrder(order3, deliveryOrders);

      assert.equal(deliveryOrders[0], order1);
      assert.equal(deliveryOrders[1], order2);
      assert.equal(deliveryOrders[2], order3);
    });

    it('should not be able to hold more than 3 orders at a time', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order3 = {
        orderNumber: 3,
        item: 'rueben',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order4 = {
        orderNumber: 4,
        item: 'garden salad',
        price: '6.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [order1, order2];

      takeOrder(order3, deliveryOrders);
      takeOrder(order4, deliveryOrders);

      assert.equal(deliveryOrders.length, 3);
      assert.deepEqual(deliveryOrders, [order1, order2, order3]);
    });
  });

  describe('refundOrder', () => {
    it('should be a function', () => {
      assert.isFunction(refundOrder);
    });

    it('should remove an order by order number', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order3 = {
        orderNumber: 3,
        item: 'rueben',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [order1, order2, order3];

      refundOrder(1, deliveryOrders);

      assert.equal(deliveryOrders.length, 2);
      assert.deepEqual(deliveryOrders, [order2, order3]);
    });
  });

  describe('listOrders', () => {
    it('should be a function', () => {
      assert.isFunction(listItems);
    });

    it('should list out all of the order items', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order3 = {
        orderNumber: 3,
        item: 'rueben',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [order1, order2, order3];
      const items = listItems(deliveryOrders);

      assert.deepEqual(items, 'burger, blt sandwich, rueben');
    });
  });

  describe('searchOrder', () => {
    it('should be a function', () => {
      assert.isFunction(searchOrder);
    });

    it('should tell us if an order is in the list', () => {
      const order1 = {
        orderNumber: 1,
        item: 'burger',
        price: '8.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const order2 = {
        orderNumber: 2,
        item: 'blt sandwich',
        price: '5.99',
        orderType: 'delivery',
        status: 'accepted',
      };

      const deliveryOrders = [order1, order2];

      assert.equal(searchOrder(deliveryOrders, 'burger'), true);
      assert.equal(searchOrder(deliveryOrders, 'sushi'), false);
    });
  });
});
