import { responseSuccess, responseError } from '../../utils/responses.js';
import usersModel from '../../libs/database/collections/users.js';

export async function signup(req, res) {
  try {
    const { name, lastname, email, role } = await usersModel.create(req.body);
    res.status(201).json(responseSuccess({ user: { name, lastname, email, role } }, 'user created success'));
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      res.status(500).json(responseError([error], 'email already exists'));
      return;
    }

    res.status(500).json(responseError(null, 'internal error'));
  }
}
