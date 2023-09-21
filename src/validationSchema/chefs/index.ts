import * as yup from 'yup';

export const chefValidationSchema = yup.object().shape({
  specialty: yup.string().required(),
  experience_years: yup.number().integer().required(),
  shift_start: yup.date().required(),
  shift_end: yup.date().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
