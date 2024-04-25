import { object, string, array } from 'yup';

export const createAddictionModel = object({
  name: string().trim().required(),
  description: string().trim().optional().notRequired(),
  resources: array().of(string())
});
