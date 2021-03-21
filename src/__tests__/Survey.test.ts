import request from 'supertest';
import { app } from '../app';
import createConnection from '../database'

describe("Survey", () =>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/api/survey/create")
        .send({
            title: "Title Example",
            description: "Description Example"
        })

        expect(response.status).toBe(201);
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/api/survey/create")
        .send({
            title: "Title Example",
            description: "Description Example"
        })
        
        const response = await request(app).get("/api/survey/show");

        expect(response.body.lenght = 2);
    });
});

