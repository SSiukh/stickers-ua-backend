import axios from 'axios';
import { getEnvVar } from '../utils/getEnvVar.js';
import { getFormattedDate } from '../utils/getFormattedDate.js';
import { createOrder } from './orders.js';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json';

export const getAllLocations = async (CityName, Limit, Page) => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'AddressGeneral',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName,
      Limit,
      Page,
    },
  };

  const { data } = await axios.post('/', requestBody);
  return data.data;
};

export const getWarehouses = async (CityName, WarehouseId, Limit, Page) => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'AddressGeneral',
    calledMethod: 'getWarehouses',
    methodProperties: {
      WarehouseId,
      CityName,
      Limit,
      Page,
    },
  };

  const { data } = await axios.post('/', requestBody);
  return data.data;
};

export const getSender = async () => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'Counterparty',
    calledMethod: 'getCounterparties',
    methodProperties: {
      CounterpartyProperty: 'Sender',
    },
  };

  const { data } = await axios.post('/', requestBody);
  return data.data;
};

export const createInvoice = async ({
  recipientName,
  phone,
  cityName,
  warehouseIndex,
  areaName,
  settlementType,
  paymentType,
  comment,
  products,
}) => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'InternetDocumentGeneral',
    calledMethod: 'save',
    methodProperties: {
      PayerType: 'Recipient',
      PaymentMethod: 'Cash',
      DateTime: getFormattedDate(),
      CargoType: 'Documents',
      Weight: '0.5',
      SeatsAmount: '1',
      ServiceType: 'WarehouseWarehouse',
      Description: 'Документи',
      Cost: '450',

      CitySender: getEnvVar('NP_CITY_SENDER'),
      Sender: getEnvVar('NP_SENDER_REF'),
      SenderAddress: getEnvVar('NP_ADDRESS_REF'),
      ContactSender: getEnvVar('NP_CONTACT_SENDER_REF'),
      SendersPhone: '380952250783',

      RecipientsPhone: phone,
      NewAddress: '1',
      RecipientCityName: cityName,
      RecipientArea: areaName,
      RecipientAddressName: warehouseIndex,
      RecipientName: recipientName,
      RecipientType: 'PrivatePerson',
      SettlementType: settlementType,
    },
  };

  const { data } = await axios.post('/', requestBody);

  await createOrder({
    invoice: data.data[0].IntDocNumber,
    recipientName,
    paymentType,
    comment,
    products,
    status: 'new',
  });

  return data.data;
};

export const getInvoices = async (dateFrom, dateTo, dateTime) => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'InternetDocumentGeneral',
    calledMethod: 'getDocumentList',
    methodProperties: {
      DateTimeFrom: dateFrom,
      DateTimeTo: dateTo,
      GetFullList: '1',
      DateTime: dateTime,
    },
  };

  const { data } = await axios.post('/', requestBody);
  return data.data;
};
