import * as yup from 'yup';

export const tableReservationValidationSchema = yup.object().shape({
  reservation_date: yup.date().required(),
  reservation_time: yup.date().required(),
  number_of_guests: yup.number().integer().required(),
  table_number: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
