import supertest from "supertest";
import { app } from "../index";
import questionPro from "../config/db";

describe("grocery", () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await questionPro.authenticate();
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await questionPro.close();
  });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjYsInJvbGVfaWQiOjIsImlhdCI6MTcxNTIxODA4MCwiZXhwIjoxNzIyOTk0MDgwfQ.clqkNCVjqbOXdf34y_dAukoNakRMO1s4uFFTn1nIAN0"; // Replace with your authorization token
  describe("get grocery route", () => {
    describe("given item does not exist", () => {
      it("should return a 404 ", async () => {
        const itemid = "5000";
        await supertest(app)
          .get(`/api/grocery/get-grocery-item-by-id?id=${itemid}`)
          .set("Authorization", `Bearer ${token}`) // Add Bearer token to headers
          .expect(404);
      });
    });
    describe("given item does exist", () => {
      it("should return a 200 ", async () => {
        const itemid = "1";
        await supertest(app)
          .get(`/api/grocery/get-grocery-item-by-id?id=${itemid}`)
          .set("Authorization", `Bearer ${token}`) // Add Bearer token to headers
          .expect(200);
      });
    });
  });
});
