import { responseSuccess, responseError } from '../../utils/responses.js';
import progressModel from '../../libs/database/collections/progress.js';
import { logger } from '../../libs/logging/logger.js';

export async function create(req, res) {
  try {
    await progressModel.create({ ...req.body, professional: req.user.id });
    res.status(201).json(responseSuccess(null, 'success create progress'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function promByIntervalDate(req, res) {
  try {
    const { initDate, finishDate, patient, professional } = req.body;

    const process = await progressModel.aggregate([
      {
        $match: {
          patient,
          professional,
          date: { $gte: initDate, $lte: finishDate }
        }
      },
      {
        $group: {
          _id: null,
          averagePoints: { $avg: '$points' }
        }
      }
    ]);

    res.status(201).json(responseSuccess({ progress: process[0]?.averagePoints }, 'progress patient'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}
