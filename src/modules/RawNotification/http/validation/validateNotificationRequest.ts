import Joi from "joi";
import { NotificationType } from "../../type";

export const validateNotificationRequest = ({body}: any) => {
  const NotificationRequestSchema = Joi.object({
    receiversIds: Joi.array().items(Joi.string()).required(),
    message: Joi.string().required(),
    title: Joi.string().optional(),
    type: Joi.valid(NotificationType.Email,NotificationType.SMS, NotificationType.Push).required(),
  });
  return NotificationRequestSchema.validate(body);
};

export default validateNotificationRequest