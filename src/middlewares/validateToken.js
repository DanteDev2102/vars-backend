import { responseError } from '../utils/responses.js';
import { verifyJWT } from '../libs/jwt/token.js';

export function validateToken(req, res, next) {
  const { headers } = req;

  if (!('Authorization' in headers) || !('authorization' in headers)) {
    return res.status(401).json(responseError(null, 'not has token'));
  }

  verifyJWT();

  next();
}
