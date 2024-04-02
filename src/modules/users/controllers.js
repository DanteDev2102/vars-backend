import usersModel from '../../libs/database/collections/users.js';
import { logger } from '../../libs/logging/logger.js';
import { responseSuccess, responseError } from '../../utils/responses.js';
import { getDataUser } from '../../utils/format.js';

export async function me(req, res) {
  try {
    const {
      user: { email }
    } = req;

    const user = await usersModel.findOne({ email, isActive: true });

    res.json(
      responseSuccess(
        {
          user: getDataUser(user)
        },
        'success'
      )
    );
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function updateProfile(req, res) {
  try {
    const {
      user: { email },
      body
    } = req;

    const user = await usersModel.findOneAndUpdate({ email, isActive: true }, body, {
      new: true
    });

    res.json(responseSuccess({ user: getDataUser(user) }, 'user updated success'));
  } catch (error) {
    logger.error(error);
    return res.json({ error: true });
  }
}

// export async function
