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

export async function getAll(_, res) {
  try {
    const addictions = await addictionsModel.find({ isActive: true });

    if (!addictions.length) {
      return res.status(404).json(responseError([{ description: 'NOT FOUND', code: 'db-404' }], 'NOT FOUND'));
    }

    res
      .status(200)
      .json(responseSuccess({ addictions: addictions.map(({ name, id }) => ({ name, id })) }, 'success find records'));
  } catch (error) {
    logger.error(error);

    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getById(req, res) {
  try {
    const addiction = await addictionsModel.findById(req.params.id, { isActive: true });

    if (!addiction) {
      return res.status(404).json(responseError([{ description: 'NOT FOUND', code: 'db-404' }], 'NOT FOUND'));
    }

    res.status(200).json(responseSuccess({ addiction }, 'success'));
  } catch (error) {
    logger.error(error);

    res.status(500).json(responseError(null, 'internal error'));
  }
}
