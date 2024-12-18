import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/enums";

describe("Testing VacationController", () => {
    let adminToken: string;
    let vacationId: string;

    before(async () => {
        const adminLoginResponse = await supertest(app.server)
            .post("/api/login")
            .send({ email: "shahar@maoz.com", password: "Shahar1234" });

        adminToken = adminLoginResponse.body;
        expect(adminToken).to.be.a("string", "Admin token was not returned as a string");
    });

    after(async () => {
        if (vacationId) {
            await supertest(app.server)
                .delete(`/api/vacations/${vacationId}`)
                .set("Authorization", `Bearer ${adminToken}`);
        }
    });

    it("should fetch all vacations", async () => {
        const response = await supertest(app.server)
            .get("/api/vacations");

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.be.an("array");
    });

    it("should create a new vacation", async () => {
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${adminToken}`)
            .field("destination", "Japan")
            .field("description", "Explore Japan")
            .field("startDate", "2025-01-01")
            .field("endDate", "2025-01-10")
            .field("price", "3000")
            .attach("image", Buffer.from("fake-image-content"), "image.jpg");

        expect(response.status).to.equal(StatusCode.Created);
        expect(response.body).to.include.keys("vacationId", "destination", "description", "startDate", "endDate", "price", "imageUrl");
        vacationId = response.body.vacationId;
    });

    it("should fetch a vacation by ID", async () => {
        const response = await supertest(app.server)
            .get(`/api/vacations/${vacationId}`);

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.have.property("vacationId", vacationId);
    });

    it("should update a vacation", async () => {
        const response = await supertest(app.server)
            .put(`/api/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .field("destination", "Updated Destination")
            .field("description", "Updated Description")
            .field("startDate", "2025-02-01")
            .field("endDate", "2025-02-10")
            .field("price", "3000")
            .attach("image", Buffer.from("fake-image-content"), "image.jpg");

        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.have.property("destination", "Updated Destination");
    });

    it("should delete a vacation", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).to.equal(StatusCode.NoContent);
    });

    it("should fail to create a vacation without authorization", async () => {
        const response = await supertest(app.server)
            .post("/api/vacations")
            .field("destination", "Unauthorized")
            .field("description", "This should fail");

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });

    it("should not delete a vacation without admin authorization", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/${vacationId}`);

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });

    it("should not create a vacation without required fields", async () => {
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${adminToken}`)
            .field("destination", "Missing Fields");

        expect(response.status).to.equal(StatusCode.BadRequest);
    });

    it("should not fetch a vacation with a non-existing ID", async () => {
        const response = await supertest(app.server)
            .get("/api/vacations/invalid-id")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).to.equal(StatusCode.NotFound);
    });

    it("should not update a vacation without authorization", async () => {
        const response = await supertest(app.server)
            .put(`/api/vacations/${vacationId}`)
            .field("destination", "No Auth Update");

        expect(response.status).to.equal(StatusCode.Unauthorized);
    });

});
