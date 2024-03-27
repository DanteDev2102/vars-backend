import { logger } from '../../libs/logging/logger.js';
import { responseSuccess, responseError } from '../../utils/responses.js';
import usersModel from '../../libs/database/collections/users.js';
import { MongooseError } from 'mongoose';

export async function signup(req, res) {
  try {
    const { name, lastname, email, role } = await usersModel.create(req.body);
    res.status(201).json(responseSuccess({ user: { name, lastname, email, role } }, 'user created success'));
  } catch (error) {
    logger.info(error);
    if (error instanceof MongooseError) {
    }
    res.status(500).json(responseError(null, 'internal error'));
  }
}
