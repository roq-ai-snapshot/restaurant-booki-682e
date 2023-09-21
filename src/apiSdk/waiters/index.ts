import axios from 'axios';
import queryString from 'query-string';
import { WaiterInterface, WaiterGetQueryInterface } from 'interfaces/waiter';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWaiters = async (query?: WaiterGetQueryInterface): Promise<PaginatedInterface<WaiterInterface>> => {
  const response = await axios.get('/api/waiters', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWaiter = async (waiter: WaiterInterface) => {
  const response = await axios.post('/api/waiters', waiter);
  return response.data;
};

export const updateWaiterById = async (id: string, waiter: WaiterInterface) => {
  const response = await axios.put(`/api/waiters/${id}`, waiter);
  return response.data;
};

export const getWaiterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/waiters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWaiterById = async (id: string) => {
  const response = await axios.delete(`/api/waiters/${id}`);
  return response.data;
};
