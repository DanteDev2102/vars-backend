import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { sendMessage, getMessages } from './controllers.js';
import { sendMessageModel } from './models.js';

const router = Router();

router.use(validateToken);

router.get('/:destinyId', getMessages);

router.post('/send', validateSchema(sendMessageModel), sendMessage);

export default router;
