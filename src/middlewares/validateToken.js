import { responseError } from '../utils/responses.js';
import { verifyJWT } from '../libs/jwt/token.js';

export async function validateToken(req, res, next) {
  const { headers } = req;

  if (!headers.authorization) {
    return res.status(401).json(responseError([{ code: 'server-401', description: 'not has token' }], 'not has token'));
  }

  const token = headers.authorization;

  const { payload } = await verifyJWT(token);

  const currentDate = Math.round(Date.now() / 1000);

  if (payload.exp <= currentDate) {
    return res.status(401).json(responseError([{ code: 'server-401', description: 'token expired' }], 'token expired'));
  }

  req.userRole = payload.role;

  next();
}
