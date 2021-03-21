import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController{
    //http://localhost:3333/answers/1?u=be06fca2-4399-4d75-88c5-56d865585351

    async execute(request: Request, response: Response){
        const {value} = request.params;
        const {u} = request.query;

        const surveyUserRepository = getCustomRepository(
            SurveyUserRepository
        );

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            return response.status(400).json({
                error: "Survey User does not exist"
            });
        }

        surveyUser.value = Number(value);

        await surveyUserRepository.save(surveyUser);

        return response.status(200).json(surveyUser);
    }
}

export { AnswerController }