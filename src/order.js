function takeOrder(order, orders) {
  if (orders.length > 2) {
    return;
  }

  orders.push(order);
}

function refundOrder(number, orders) {
  // const result = [];

  // for (let i = 0; i < orders.length; i += 1) {
  //   if (i === number - 1) {
  //     continue;
  //   }
  //   result.push(orders[i]);
  // }
  // return result;

  orders.splice([number - 1], 1);
}

function listItems(orders) {
  // const items = [];
  // for (const order of orders) {
  //   items.push(order.item);
  // }
  // return items.join(', ');

  // return orders.reduce((result, order) => {
  //   return `${result}, ${order.item}`;
  // }, '').slice(2);

  return orders
    .reduce((result, order) => `${result}, ${order.item}`, '')
    .slice(2);
}

function searchOrder(orders, item) {
  // let flag = false;
  // orders.forEach((element) => {
  //   if (element.item === item) {
  //     flag = true;
  //   }
  // });
  // return flag;

  return orders.map((current) => current.item === item).includes(true);
}

module.exports = {
  takeOrder,
  refundOrder,
  listItems,
  searchOrder,
};
