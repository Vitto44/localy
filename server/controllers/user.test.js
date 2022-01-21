const User = require("../models/users.model");
const testPrepper = require("../utils/testPrepper");

describe("User Testing", () => {
  const request = testPrepper();

  const userDummy = {
    firstName: "Blob",
    lastName: "Doe",
    password: "0000",
    email: "blolb23@yahoo.cz",
  };

  test("Check if request adds user to the database", () => {
    request
      .post("/register")
      .send(userDummy)
      .then((res) => expect(res.statusCode).toBe(201))
      .catch((err) => err);
  });

  test("Check if user can login", () => {
    request
      .post("/login")
      .send(userDummy)
      .then((res) => expect(res.message).toBe("Could not create user"))
      .catch((err) => err);
  });

  test("Check that use can't register twice", () => {
    request
      .post("/register")
      .send(userDummy)
      .then((res) => expect(res.statusCode).toBe(409))
      .catch((err) => err);
  });

  test("Check if user can be deleted", () => {
    request
      .delete("/delete")
      .send(userDummy)
      .then((res) => expect(res.message).toBe("User deleted"))
      .catch((err) => err);
  });

  test("Check if user will be added if object is empty", () => {
    request
      .post("/register")
      .send()
      .then((res) => expect(res.message).toBe("Could not create user"))
      .catch((err) => err);
  });
});
