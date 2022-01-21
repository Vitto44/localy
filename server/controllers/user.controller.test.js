const request = require("supertest");
const app = require("express");
const sequelize = require("../models/index");
const User = require("../models/users.model");
const router = require("../router");

describe("User Testing", () => {
  const app = express();
  app.use(express.json());

  const userDummy = {
    firstName: "Blob",
    lastName: "Doe",
    password: "0000",
    email: "blolb23@yahoo.cz",
  };

  test("Check if request adds user to the database", () => {
    request(app)
      .post("/register")
      .send(userDummy)
      .then((res) => expect(res.statusCode).toBe(201));
  });

  // test("Check if user can login", () => {
  //   request(app)
  //     .post("/login")
  //     .send(userDummy)
  //     .then((res) => expect(res.message).toBe("Could not create user"));
  // });

  // test("Check that use can't register twice", () => {
  //   request(app)
  //     .post("/register")
  //     .send(userDummy)
  //     .then((res) => expect(res.statusCode).toBe(409));
  // });

  // test("Check if user can be deleted", () => {
  //   request(app)
  //     .delete("/delete")
  //     .send(userDummy)
  //     .then((res) => expect(res.message).toBe("User deleted"));
  // });

  // test("Check if user will be added if object is empty", () => {
  //   request(app)
  //     .post("/register")
  //     .send()
  //     .then((res) => expect(res.message).toBe("Could not create user"));
  // });
  // test("Check for 404s", () => {
  //   request(app)
  //     .get("/test")
  //     .send()
  //     .then((res) => expect(res.message).toBe("Page not found"));
  // });
});

afterAll((done) => {
  sequelize.close();
  done();
});
