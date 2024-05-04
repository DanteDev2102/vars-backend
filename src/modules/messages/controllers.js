import { responseSuccess, responseError } from '../../utils/responses.js';
import msgModel from '../../libs/database/collections/messages.js';
import { logger } from '../../libs/logging/logger.js';

export async function sendMessage(req, res) {
  try {
    const query = { originId: req.user.id, ...req.body };
    await msgModel.create(query);
    res.status(201).json(responseSuccess(null, 'success send message'));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await msgModel.find({ originId: req.user.id, destinyId: req.params.id }).sort({ createdAt: -1 });

    res.json(responseSuccess({ messages }));
  } catch (error) {
    logger.error(error);
    res.status(500).json(responseError(null, 'internal error'));
  }
}
