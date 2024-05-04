import { object, string } from 'yup';

export const sendMessageModel = object({
  destinyId: string().required(),
  content: string().required()
});
