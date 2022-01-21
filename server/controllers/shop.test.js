const User = require("../models/users.model");
const testPrepper = require("../utils/testPrepper");

describe("Shop Testing", () => {
  const request = testPrepper();

  const shopDummy = {
    name: "string",
    category: "string",
    address: "string",
    telephone: 55555555555,
    email: "string",
    website: "string",
    description: "string",
    latitude: 0.2,
    longitude: 0.2,
    products: ["a", "b", "c"],
    picture: ["a", "b", "c"],
  };

  test("Should create a shop", () => {
    request
      .post("/createshop")
      .send(shopDummy)
      .then((res) => expect(res.statusCode).toBe(201))
      .catch((err) => err);
  });

  // test("Should find a shop", () => {
  //   request
  //     .post("/createshop")
  //     .send(shopDummy)
  //     .then((res) => expect(res.statusCode).toBe(201))
  //     .catch((err) => err);
  // });

  test("Should add image to shop", () => {
    request
      .post("/addimage")
      .send(shopDummy)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => err);
  });

  test("Should add products to shop", () => {
    request
      .post("/addproducts")
      .send(shopDummy)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => err);
  });

  test("Should remove products from shop", () => {
    request
      .delete("/removeproduct")
      .send(shopDummy)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => err);
  });
});
