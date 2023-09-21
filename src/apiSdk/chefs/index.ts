import axios from 'axios';
import queryString from 'query-string';
import { ChefInterface, ChefGetQueryInterface } from 'interfaces/chef';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChefs = async (query?: ChefGetQueryInterface): Promise<PaginatedInterface<ChefInterface>> => {
  const response = await axios.get('/api/chefs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createChef = async (chef: ChefInterface) => {
  const response = await axios.post('/api/chefs', chef);
  return response.data;
};

export const updateChefById = async (id: string, chef: ChefInterface) => {
  const response = await axios.put(`/api/chefs/${id}`, chef);
  return response.data;
};

export const getChefById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/chefs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChefById = async (id: string) => {
  const response = await axios.delete(`/api/chefs/${id}`);
  return response.data;
};
