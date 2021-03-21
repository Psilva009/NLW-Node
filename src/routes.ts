import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/api/user/create", userController.create);

router.post("/api/survey/create", surveyController.create);
router.get("/api/survey/show", surveyController.show);

router.get("/api/send-mail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router }