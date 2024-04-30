import { object, string, array, bool } from 'yup';

export const createAddictionModel = object({
  name: string().trim().required(),
  description: string().trim().optional().notRequired(),
  resources: array().of(
    object({
      url: string().url().required(),
      title: string().required(),
      description: string().required(),
      active: bool().required()
    })
  )
});
