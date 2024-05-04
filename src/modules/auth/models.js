import { boolean, object, string, number } from 'yup';

export const signinModel = object({
  email: string().trim().email().required(),
  password: string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)
});

export const signupModel = object({
  email: string().trim().email().required(),
  password: string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/),
  name: string()
    .trim()
    .required()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z]+$/g),
  lastname: string()
    .trim()
    .required()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z]+$/g),
  role: string()
    .required()
    .trim()
    .matches(/^(professional|patient)$/),
  context: string().trim().notRequired().optional(),
  addictionId: string()
    .trim()
    .matches(/^[0-9a-fA-F]{24}$/)
    .notRequired()
    .optional(),
  nroDoctor: string()
    .matches(/^[0-9]+$/g)
    .optional(),
  isTreatment: boolean().optional(),
  treatment: string().optional(),
  title: string().optional(),
  phone: string().optional(),
  birthdate: number().integer().positive()
});
