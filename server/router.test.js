// const express = require("express");
// const router = require("./router");
// const superset = require("supertest");
// const sequelize = require("./models/index");

// describe("Router testing", () => {
//   const app = express();

//   app.use(express.json());
//   app.use(router);
//   const request = superset(app);

//   beforeAll(async () => {
//     await sequelize.sync();
//   });
//   afterAll((done) => {
//     sequelize.close();
//     done();
//   });

//   test("Check for 404s", (done) => {
//     request
//       .get("/test")
//       .then((res) => {
//         expect(res.message).toBe("Page not found");
//         done();
//       })
//       .catch((err) => done(err));
//   });
// });
