import { ChefInterface } from 'interfaces/chef';
import { MenuInterface } from 'interfaces/menu';
import { TableReservationInterface } from 'interfaces/table-reservation';
import { WaiterInterface } from 'interfaces/waiter';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  address?: string;
  phone_number?: string;
  opening_hours?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  chef?: ChefInterface[];
  menu?: MenuInterface[];
  table_reservation?: TableReservationInterface[];
  waiter?: WaiterInterface[];
  user?: UserInterface;
  _count?: {
    chef?: number;
    menu?: number;
    table_reservation?: number;
    waiter?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  phone_number?: string;
  opening_hours?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
