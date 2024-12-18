import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/enums";


describe("Testing AuthController", () => {
    describe("Basic Authentication Flow", () => {
        const uniqueEmail = `test${Date.now()}@example.com`;

        it("should register a new user successfully", async () => {
            const response = await supertest(app.server)
                .post("/api/register")
                .send({
                    firstName: "Test",
                    lastName: "User",
                    email: uniqueEmail,
                    password: "Test1234"
                });
            
            expect(response.status).to.equal(StatusCode.Created);
            expect(response.body).to.be.a("string");
        });

        it("should prevent registration with existing email", async () => {
            const response = await supertest(app.server)
                .post("/api/register")
                .send({
                    firstName: "Test",
                    lastName: "User",
                    email: "shahar@maoz.com",
                    password: "Test1234"
                });

            expect(response.status).to.equal(StatusCode.BadRequest);
            expect(response.body.message).to.include("Email already exists");
        });

        it("should login successfully with valid credentials", async () => {
            const response = await supertest(app.server)
                .post("/api/login")
                .send({
                    email: "shahar@maoz.com",
                    password: "Shahar1234"
                });

            expect(response.status).to.equal(StatusCode.OK);
            expect(response.body).to.be.a("string");
        });

        it("should deny login with incorrect credentials", async () => {
            const response = await supertest(app.server)
                .post("/api/login")
                .send({
                    email: "shahar@maoz.com",
                    password: "WrongPassword"
                });

            expect(response.status).to.equal(StatusCode.BadRequest);
            expect(response.body.message).to.include("Incorrect email or password");
        });
    });
});

describe("Testing LikeController", () => {
    let userToken: string;
    let vacationId: string;

    before(async () => {
        const loginResponse = await supertest(app.server)
            .post("/api/login")
            .send({ email: "user@test.com", password: "User1234" });
        userToken = loginResponse.body;

        const vacationsResponse = await supertest(app.server)
            .get("/api/vacations")
            .set("Authorization", `Bearer ${userToken}`);
        vacationId = vacationsResponse.body[0]?.id;
    });


    it("should handle unauthorized like operations", async () => {
        const response = await supertest(app.server)
            .post(`/api/vacations/${vacationId}/likes`);

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });
});

describe("Testing ReportsController", () => {
    let adminToken: string;
    let userToken: string;

    before(async () => {
        const adminLogin = await supertest(app.server)
            .post("/api/login")
            .send({ email: "admin@gmail.com", password: "Admin1234" });
        adminToken = adminLogin.body;

        const userLogin = await supertest(app.server)
            .post("/api/login")
            .send({ email: "user@user.com", password: "User1234" });
        userToken = userLogin.body;
    });

    describe("Report Access Control", () => {
        it("should allow admin to access reports", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(response.status).to.equal(StatusCode.OK);
            expect(response.body).to.be.an("array");
            expect(response.body[0]).to.include.all.keys("destination", "likeCount");
        });

        it("should prevent regular users from accessing reports", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report")
                .set("Authorization", `Bearer ${userToken}`);

            expect(response.status).to.equal(StatusCode.Unauthorized);
        });

        it("should allow admin to download CSV report", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report/csv")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(response.status).to.equal(StatusCode.OK);
            expect(response.headers['content-type']).to.include('text/csv');
            expect(response.headers['content-disposition']).to.include('attachment');
            expect(response.text).to.include('Destination,Likes');
        });
    });
});

describe("Testing VacationController", () => {
    let adminToken: string;
    let vacationId: string;

    before(async () => {
        const adminLogin = await supertest(app.server)
            .post("/api/login")
            .send({ email: "admin@gmail.com", password: "Admin1234" });
        adminToken = adminLogin.body;
    });

    it("should fetch all vacations", async () => {
        const response = await supertest(app.server)
            .get("/api/vacations")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.be.an("array");
    });

    it("should handle unauthorized access", async () => {
        const response = await supertest(app.server)
            .post("/api/vacations")
            .field("destination", "Unauthorized Test");

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });
});