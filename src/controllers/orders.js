import {
  deleteOrder,
  getOrders,
  setCompleteOrder,
} from '../services/orders.js';

export const getOrdersController = async (req, res) => {
  const { status } = req.query;
  const orders = await getOrders(status);

  res.json({
    status: 200,
    message: 'Successfully found orders!',
    data: orders,
  });
};

export const setCompletedOrderController = async (req, res) => {
  const { orderId } = req.params;

  const data = await setCompleteOrder(orderId);

  res.json({
    status: 200,
    message: 'Successfully updated order!',
    data,
  });
};

export const deleteOrderController = async (req, res) => {
  const { orderId } = req.params;

  await deleteOrder(orderId);

  res.sendStatus(204);
};
