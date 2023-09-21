import * as yup from 'yup';

export const waiterValidationSchema = yup.object().shape({
  shift_start: yup.date().required(),
  shift_end: yup.date().required(),
  uniform_number: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
