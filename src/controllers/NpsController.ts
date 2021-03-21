import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import {Not} from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController{
    /**
     * 
     1 2 3 4 5 6 7 8 9 10
     detratores -> 0 - 6
     passivos -> 7 - 8
     promotores -> 9 - 10   

     NPS = (Nº de promotores) - (Nº de detratores)   * 100
           ---------------------------------------
                 (Nº de correspondentes)
     */
    async execute(request: Request, response: Response){
        const {survey_id} = request.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({
            where: {survey_id: survey_id, value: Not('null')},
        });

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoter = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAswers = surveysUsers.length;

        const calculate = Number(
                ((promoter - detractor) / totalAswers * 100).toFixed(2)
            );

        return response.status(200).json({
            detractor,
            promoter,
            passive,
            totalAswers,
            calculate
        });
    }
}

export {NpsController}