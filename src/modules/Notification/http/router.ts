import Router , { Request, Response } from "express";
import resFormatter from "../../../shared/helpers/httpResponse";
import validateNotificationRequest from "./validation/validateNotificationRequest"
const router = Router();

router.get("/v1/notification/send", async (req: Request, res: Response) => {
  try {
    const { error } = validateNotificationRequest(req);
    if (error) {
      return res.status(422).json(resFormatter.validationError(error));
    }
    const result = {};
    // go to RabbitMQ, save raw data into it.
    // wait for Akn, send response back
    res.status(201).json(resFormatter.success("received", result, 200));
  } catch (err) {
    res.status(400).json(resFormatter.error(err, 400));
  }
});

export default router;