const superset = require("supertest");
const express = require("express");
const sequelize = require("../models/index");
const router = require("../router");

const testPrepper = () => {
  const app = express();

  app.use(express.json());
  app.use(router);
  const request = superset(app);

  beforeAll(async () => {
    await sequelize.sync();
  });
  afterAll(async (done) => {
    await sequelize.close();
    done();
  });
  return request;
};

module.exports = testPrepper;
