describe("Login into Localy", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Login without any inputs", () => {
    cy.contains("Login").click();

    cy.get("input:invalid");
    cy.get(".formInput[name=email]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.get(".formInput[name=password]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Login with invalid email", () => {
    cy.contains("Login").click();

    cy.get("input:invalid");
    cy.get(".formInput[name=email]")
      .type("aaa")
      .then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Please include an '@' in the email address. 'aaa' is missing an '@'."
        );
      });

    cy.get(".formInput[name=password]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Login with Username and Password", function () {
    cy.contains("Login").click();
    cy.get(".email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get(".password")
      .type("fake@password")
      .should("have.value", "fake@password");

    cy.contains("Log In").click();

    cy.url().should("include", "/profile");
  });

  it("Enter Login page, then exit", function () {
    cy.contains("Login").click();

    cy.get(".closeFormBtn").click();
    cy.url().should("include", "/");
  });

  it("Login with Username, then Logout", function () {
    cy.contains("Login").click();
    cy.get(".email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get(".password")
      .type("fake@password")
      .should("have.value", "fake@password");

    cy.contains("Log In").click();

    cy.url().should("include", "/profile");

    cy.get(".logoutBtn").click();
    cy.url().should("include", "/");
  });

  //Some things to add after bug fixes
  //Add scenarios for invalid username/password when logging in
  //Add scenarios for sessions authenticated
  //Add scenario for going to profile page when logged out
});
