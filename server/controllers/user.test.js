// const testPrepper = require("../utils/testPrepper");
const supertest = require("supertest-session");
const express = require("express");
const sequelize = require("../models/index");
const router = require("../router");
const session = require("express-session");
const SECRET = process.env.SECRET;

beforeAll(async () => {
  await sequelize.sync();
});

describe("User Testing", () => {
  // const request = testPrepper();

  const app = express();
  app.use(express.json());
  app.use(router);

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
  const request = supertest(app);

  const userDummy = {
    firstName: "Blob",
    lastName: "Doe",
    password: "0000",
    email: "blolb23@yahoo.cz",
  };

  test("Should add user to the database", (done) => {
    // expect(await request.post("/create").send(userDummy)).toBe(201);

    request
      .post("/create")
      .send(userDummy)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  // test("User can login", (done) => {
  //   request
  //     .post("/login")
  //     .send(userDummy)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(202);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // test("Check that use can't register twice", (done) => {
  //   request
  //     .post("/register")
  //     .send(userDummy)
  //     .then((res) => {
  //       expect(res.message).toBe("Invalid e-mail and/or password");
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // test("Check if user can be deleted", () => {
  //   request
  //     .delete("/delete")
  //     .send(userDummy)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(34652346);
  //     })
  //     .catch((err) => err);
  // });

  // test("Check if user will be added if object is empty", (done) => {
  //   request
  //     .post("/register")
  //     .send()
  //     .then((res) => {
  //       expect(res.message).toBe("Could not create user");
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  afterAll((done) => {
    sequelize.close();
    done();
  });
});
