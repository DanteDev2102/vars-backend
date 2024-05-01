import { responseError } from '../utils/responses.js';
import { verifyJWT } from '../libs/jwt/token.js';
import { logger } from '../libs/logging/logger.js';

export async function validateToken(req, res, next) {
  try {
    const { headers } = req;

    if (!headers.authorization) {
      return res
        .status(401)
        .json(responseError([{ code: 'server-401', description: 'not has token' }], 'not has token'));
    }

    const token = headers.authorization;

    const { payload } = await verifyJWT(token);

    req.user = {
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    logger.error(error);

    return res.status(403).json(responseError([{ code: 'server-403', description: error.name }], error.name));
  }
}
