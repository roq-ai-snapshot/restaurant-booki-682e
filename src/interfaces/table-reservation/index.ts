import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface TableReservationInterface {
  id?: string;
  reservation_date: any;
  reservation_time: any;
  number_of_guests: number;
  table_number: number;
  user_id: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}

export interface TableReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  restaurant_id?: string;
}
