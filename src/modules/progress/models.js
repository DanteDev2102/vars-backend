import { object, string, number } from 'yup';

export const createProgressModel = object({
  points: number().integer().min(1).max(10).required(),
  context: string().required(),
  date: number().integer().positive(),
  patient: string().required(),
  professional: string().required()
});

export const promProgressModel = object({
  initDate: number().integer().positive().required(),
  finishDate: number().integer().positive().required(),
  patient: string().required()
});
