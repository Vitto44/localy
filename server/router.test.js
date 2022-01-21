const superset = require("supertest");
const testPrepper = require("./utils/testPrepper");

describe("Router testing", () => {
  const request = testPrepper();

  test("Check for 404s", () => {
    request
      .get("/test")
      .then((res) => expect(res.message).toBe("Page not found"))
      .catch((err) => err);
  });
});
