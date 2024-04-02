import { responseSuccess, responseError } from '../../utils/responses.js';
import usersModel from '../../libs/database/collections/users.js';
import { hashString, isGenerateHashWithString } from '../../libs/hashing/hash.js';
import { generateJWT } from '../../libs/jwt/token.js';
import { logger } from '../../libs/logging/logger.js';
import { getDataUser } from '../../utils/format.js';

export async function signup(req, res) {
  try {
    req.body.password = await hashString(req.body.password);

    const user = await usersModel.create(req.body);
    const jwt = await generateJWT({ email: user.email, role: user.email });

    res.status(201).json(responseSuccess({ user: getDataUser(user), accessToken: jwt }, 'user created success'));
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      logger.error(error);
      return res
        .status(500)
        .json(responseError([{ code: 'db-11000', description: 'email already exists' }], 'email already exists'));
    }

    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function signin(req, res) {
  try {
    const { body } = req;

    const user = await usersModel.findOne({
      email: body.email
    });

    if (!user) {
      return res
        .status(403)
        .json(responseError([{ code: 'server-403', description: 'wrong credentials' }], 'wrong credentials'));
    }

    const isCorrectPassword = await isGenerateHashWithString(body.password, user.password);
    if (!isCorrectPassword) {
      return res
        .status(403)
        .json(responseError([{ code: 'server-403', description: 'wrong credentials' }], 'wrong credentials'));
    }

    const jwt = await generateJWT({ email: user.email, role: user.role });

    res.json(responseSuccess({ user: getDataUser(user), accessToken: jwt }, 'signin successfull'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}
