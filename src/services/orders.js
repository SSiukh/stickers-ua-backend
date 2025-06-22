import { OrderCollection } from '../db/models/order.js';

export const getOrders = async (status) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const orders = await OrderCollection.find(filter).populate(
    'products.productId',
  );

  return orders;
};

export const createOrder = async (payload) => {
  const order = await OrderCollection.create({ ...payload });
  return order;
};

export const setCompleteOrder = async (orderId) => {
  const updatedOrder = await OrderCollection.findByIdAndUpdate(
    orderId,
    { status: 'completed' },
    { new: true },
  );

  return updatedOrder;
};

export const deleteOrder = async (orderId) => {
  const deletedOrder = await OrderCollection.findByIdAndDelete(orderId);
  return deletedOrder;
};
