import { responseSuccess, responseError } from '../../utils/responses.js';
import addictionsModel from '../../libs/database/collections/addictions.js';
import { logger } from '../../libs/logging/logger.js';

export async function create(req, res) {
  try {
    const { name, description, resources, id } = await addictionsModel.create(req.body);

    res.status(201).json(responseSuccess({ addiction: { name, description, resources, id } }, 'user created success'));
  } catch (error) {
    logger.error(error);

    if (error.code === 11000 || error.code === 11001) {
      return res
        .status(500)
        .json(responseError([{ code: 'db-11000', description: 'email already exists' }], 'email already exists'));
    }

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
