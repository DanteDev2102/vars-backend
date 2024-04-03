import usersModel from '../../libs/database/collections/users.js';
import { logger } from '../../libs/logging/logger.js';
import { responseSuccess, responseError } from '../../utils/responses.js';
import { getDataUser } from '../../utils/format.js';

export async function me(req, res) {
  try {
    const {
      user: { email }
    } = req;

    const user = await usersModel.findOne({ email, isActive: true }).populate('addictionId');

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

export async function getProfessionals(req, res) {
  try {
    const page = +req.query.page;

    const limit = 20;
    const offset = (page - 1) * limit;
    const nextPage = page + 1;
    const prevPage = page - 1;

    const professionals = await usersModel
      .find({ isActive: true, role: 'professional' })
      .sort({ name: 'asc' })
      .limit(limit)
      .skip(offset);

    if (!professionals.length) {
      return res.status(404).json(responseSuccess({ users: [] }, 'not found'));
    }

    const count = await usersModel.find({ isActive: true, role: 'professional' }).countDocuments();

    res.json(
      responseSuccess(
        {
          count,
          nextPage,
          prevPage: prevPage === 0 ? null : prevPage,
          users: professionals.map(getDataUser)
        },
        'success professionals'
      )
    );
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getMyPatients(req, res) {
  try {
    const { patients } = await usersModel.findOne({ isActive: true, email: req.user.email }).populate('patients');

    res.json(responseSuccess({ users: patients.map(getDataUser) }, 'success patients'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getMyProfessional(req, res) {
  try {
    const { professional } = await usersModel
      .findOne({ isActive: true, email: req.user.email })
      .populate('professional');

    res.json(responseSuccess({ user: getDataUser(professional) }, 'success professional'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getMyAddiction(req, res) {
  try {
    const { addictionId } = await usersModel.findOne({ isActive: true, email: req.user.email }).populate('addictionId');

    res.json(responseSuccess({ addiction: addictionId }, 'success addiction'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}
