import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import jwt from "jsonwebtoken";
import { StatusCode } from "../src/3-models/enums";

describe("Testing LikeController", () => {
    let token: string;
    let vacationId: string;

    before(async () => {
        const loginResponse = await supertest(app.server)
            .post("/api/login")
            .send({ email: "shahar@maoz.com", password: "Shahar1234" });

        token = loginResponse.body;
        expect(token).to.be.a("string", "Token was not returned as a string");

        const decoded = jwt.decode(token);
        console.log("Decoded token:", decoded);

        const vacationResponse = await supertest(app.server)
            .get("/api/likes/")
            .set("Authorization", `Bearer ${token}`);

        vacationId = vacationResponse.body[0]?.vacationId;
        expect(vacationId).to.be.a("string", "No valid vacation ID found to test against");
    });

    it("should fetch all likes", async () => {
        const response = await supertest(app.server)
            .get("/api/likes")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.be.an("array");
    });

    it("should add a like to a vacation", async () => {
        const response = await supertest(app.server)
            .post(`/api/vacations/${vacationId}/likes`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(StatusCode.Created);
        expect(response.body).to.include.keys("id", "userId", "vacationId", "likeDate");
        expect(response.body.vacationId).to.equal(vacationId);
    });

    it("should not add a like to a vacation with invalid vacation ID", async () => {
        const invalidVacationId = "invalid-id";
        const response = await supertest(app.server)
            .post(`/api/vacations/${invalidVacationId}/likes`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).to.equal(StatusCode.NotFound); 
    });

    it("should remove a like from a vacation", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/${vacationId}/likes`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(StatusCode.NoContent);
    });

    it("should not add a like without authentication", async () => {
        const response = await supertest(app.server)
            .post(`/api/vacations/${vacationId}/likes`);

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });

    it("should not fetch likes without authentication", async () => {
        const response = await supertest(app.server)
            .get("/api/likes");

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });
    it("should fetch global likes report", async () => {
        const response = await supertest(app.server)
            .get("/api/likes/report")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.be.an("array");
    });

    it("should download likes report as CSV", async () => {
        const response = await supertest(app.server)
            .get("/api/likes/report/csv")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.include("text/csv");
    });

    it("should not remove a like with invalid vacation ID", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/invalid-id/likes`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(StatusCode.NotFound);
    });
});
