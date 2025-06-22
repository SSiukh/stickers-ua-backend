import {
  createInvoice,
  getAllLocations,
  getInvoices,
  getWarehouses,
} from '../services/np.js';

export const getLocationsController = async (req, res) => {
  const { cityName, limit, page } = req.query;
  const locations = await getAllLocations(cityName, limit, page);

  res.status(200).json({
    status: 200,
    data: locations,
  });
};

export const getWarehousesController = async (req, res) => {
  const { cityName, warehouseId, limit, page } = req.query;
  const warehouses = await getWarehouses(cityName, warehouseId, limit, page);

  res.status(200).json({
    status: 200,
    data: warehouses,
  });
};

export const createInvoiceController = async (req, res) => {
  const data = req.body;
  const invoice = await createInvoice(data);

  res.status(201).json({
    status: 201,
    message: 'Successfully created an invoice',
    data: invoice,
  });
};

export const getInvoicesController = async (req, res) => {
  const { dateFrom, dateTo, dateTime } = req.query;

  const invoices = await getInvoices(dateFrom, dateTo, dateTime);

  res.json({
    status: 200,
    message: 'Successfully recieved invoices',
    data: invoices,
  });
};
