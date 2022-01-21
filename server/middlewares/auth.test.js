const superset = require("supertest");
const sequelize = require("../models/index");
const session = require("express-session");
const express = require("express");
const SECRET = process.env.SECRET;
const router = require("../router");

describe("Middleware test", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });
  afterAll((done) => {
    sequelize.close();
    done();
  });

  const user = {
    email: "Jonathan@email.cz",
    password: "test",
    firstName: "Jonathan",
    lastName: "Doe",
  };

  const app = express();
  app.use(express.json());
  app.use(
    session({
      // the store property, if not specified, defaults to the in-memory store
      name: "sid",
      saveUninitialized: false,
      resave: false,
      secret: SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        // we would want to set secure=true in a production environment
        secure: false,
      },
    })
  );
  app.use(router);
  const request = superset(app);

  test("Should execute next when auth is ok", async () => {
    // create new User
    const newUser = await request.post("/register").send(user);

    // send get request with uid in payload to /profile endpoint
    request
      .get("/profile")
      .send(newUser)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => err);

    // delete the newly created user
    await request.delete("/deleteUser").send(user.email);
  });
});
