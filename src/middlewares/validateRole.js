import { responseError } from '../utils/responses.js';

export function validateRole(assignRole) {
  return function (req, res, next) {
    const { role } = req.user;

    if (role !== assignRole) {
      return res.status(401).json(responseError([{ code: 'server-401', description: 'invalid role' }, 'invalid role']));
    }

    next();
  };
}
