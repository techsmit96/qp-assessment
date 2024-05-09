import supertest from "supertest";
import { app } from "../index";
import questionPro from "../config/db";

describe("Login Endpoint", () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await questionPro.authenticate();
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await questionPro.close();
  });
  describe("user login route", () => {
    describe("user exist", () => {
      it("should return a JWT token upon successful login", async () => {
        // Send a POST request to the login endpoint with valid credentials
        const response = await supertest(app).post("/api/users/login").send({
          username: "user",
          password: "user1234",
        });
        // Check that the response status is 200
        expect(200).toBe(200);

        // Check that the response body contains a JWT token
        expect(response.body).toHaveProperty("token");
      });
    });
    describe("user does not exist", () => {
      it("should return an error with invalid credentials", async () => {
        // Send a POST request to the login endpoint with invalid credentials
        const response = await supertest(app).post("/api/users/login").send({
          email: "invalid",
          password: "1234",
        });

        expect(500).toBe(500);
      });
    });
  });
    describe("admin login route", () => {
      describe("admin exist", () => {
        it("should return a JWT token upon successful login", async () => {
          // Send a POST request to the login endpoint with valid credentials
          const response = await supertest(app).post("/api/users/login").send({
            username: "admin",
            password: "admin1234",
          });

          // Check that the response status is 200
          expect(response.status).toBe(200);

          // Check that the response body contains a JWT token
          expect(response.body).toHaveProperty("token");
        });
      });
      describe("admin does not exist", () => {
        it("should return an error with invalid credentials", async () => {
          // Send a POST request to the login endpoint with invalid credentials
          const response = await supertest(app).post("/api/users/login").send({
            email: "invalid",
            password: "1234",
          });

          expect(500).toBe(500);
        });
      });
    });
});
