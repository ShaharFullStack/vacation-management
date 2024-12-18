import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/enums";
import { number } from "joi";

describe("Testing Like Reports", () => {
    let adminToken: string;
    let userToken: string;

    before(async () => {
        // Login as admin
        const adminLogin = await supertest(app.server)
            .post("/api/login")
            .send({ email: "admin@gmail.com", password: "Admin1234" });
        adminToken = adminLogin.body;

        // Login as regular user
        const userLogin = await supertest(app.server)
            .post("/api/login")
            .send({ email: "user@user.com", password: "User1234" });
        userToken = userLogin.body;
    });

    describe("Report Access Tests", () => {
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

        it("should validate report data structure", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(response.body[0]).to.include.all.keys("destination", "likeCount");
        });
    });

    describe("CSV Download Tests", () => {
        it("should allow admin to access reports", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(response.status).to.equal(StatusCode.OK);
            expect(response.body).to.be.an("array");
            expect(response.body[0]).to.include.all.keys("destination", "likeCount");
        });


        it("should prevent regular user from downloading CSV", async () => {
            const response = await supertest(app.server)
                .get("/api/likes/report/csv")
                .set("Authorization", `Bearer ${userToken}`);

            expect(response.status).to.equal(StatusCode.Unauthorized);
        });

    });
});
