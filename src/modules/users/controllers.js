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

export async function getMyPatients(req, res) {
  try {
    const { patients } = await usersModel.findOne({ isActive: true, email: req.user.email }).populate('patients');

    if (!patients.length) {
      return res.status(404).json(responseSuccess({ users: [] }, 'not found'));
    }

    res.json(responseSuccess({ users: patients.map(getDataUser) }, 'success patients'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getMyProfessional(req, res) {
  try {
    const user = await usersModel.findOne({ isActive: true, email: req.user.email }).populate('professional');

    if (!Object.keys(user).length || !user.professional) {
      return res.json(responseSuccess(null, 'not professional asigment'));
    }

    res.json(responseSuccess({ user: getDataUser(user) }, 'success professional'));
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

//TODO

export async function createGoal(req, res) {}

export async function completeGoal(req, res) {}

export async function createNote(req, res) {}

export async function getPeriodNotes(req, res) {}

export async function getPeriodGoals(req, res) {}
