let orders = [];

module.exports = {
  getOrders: () => orders,
  addOrder: (order) => {
    orders.push(order);
    return order;
  },
  cancelOrder: (id) => {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = 'Cancelled';
      return true;
    }
    return false;
  }
};
