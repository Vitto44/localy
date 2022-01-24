// // const testPrepper = require("../utils/testPrepper");

// describe("Shop Testing", () => {
//   // const request = testPrepper();
//   beforeAll(async () => {
//     await sequelize.sync();
//   });
//   afterAll((done) => {
//     sequelize.close();
//     done();
//   });

//   const app = express();
//   app.use(express.json());
//   app.use(router);
//   const request = superset(app);

//   const shopDummy = {
//     name: "string",
//     category: "string",
//     address: "string",
//     telephone: 55555555555,
//     email: "string",
//     website: "string",
//     description: "string",
//     latitude: 0.2346768,
//     longitude: 0.246568,
//     products: ["a", "b", "c"],
//     picture: ["a", "b", "c"],
//   };

//   test("Should create a shop", (done) => {
//     request
//       .post("/createshop")
//       .send(shopDummy)
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("Should find a shop", (done) => {
//     request
//       .post("/createshop")
//       .send(shopDummy)
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   test("Should add image to shop", (done) => {
//     request
//       .post("/addimage")
//       .send(shopDummy)
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   test("Should add products to shop", (done) => {
//     request
//       .post("/addproducts")
//       .send(shopDummy)
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   test("Should remove products from shop", (done) => {
//     request
//       .delete("/removeproduct")
//       .send(shopDummy)
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         done();
//       })
//       .catch((err) => done(err));
//   });
// });
