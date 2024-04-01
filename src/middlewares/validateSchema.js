import { ValidationError } from 'yup';
import { responseError } from '../utils/responses.js';

export const validateSchema = (schema) => async (req, res, next) => {
  try {
    const { body } = req;

    await schema.validate(body);

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(responseError(error.errors, 'invalid entity'));
      return;
    }

    res.status(500).json(responseError(null, 'internal error'));
  }
};
