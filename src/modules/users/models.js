import { object, string, boolean } from 'yup';

export const updateProfileModel = object({
  email: string().trim().email().notRequired().optional(),
  name: string()
    .trim()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z]+$/g)
    .notRequired()
    .optional(),
  lastname: string()
    .trim()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z]+$/g)
    .notRequired()
    .optional(),
  context: string().trim().notRequired().optional(),
  nroDoctor: string()
    .trim()
    .notRequired()
    .optional()
    .matches(/^[0-9]+$/g),
  isTreatment: boolean().notRequired().optional(),
  treatment: string().notRequired().optional()
});
