describe("Register an account, then logout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Register an account without any inputs", () => {
    cy.contains("Register").click();

    cy.get(".submitBtn").click();
    cy.get("input:invalid");
    cy.get(".formInput[name=firstName]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.get(".formInput[name=lastName]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.get(".formInput[name=email]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
    cy.get(".formInput[name=password]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });
  it("Register an account", () => {
    cy.contains("Register").click();

    cy.get(".formInput[name=firstName]")
      .type("Fake First Name")
      .should("have.value", "Fake First Name");

    cy.get(".formInput[name=lastName]")
      .type("Fake Last Name")
      .should("have.value", "Fake Last Name");

    cy.get(".formInput[name=email]")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get(".formInput[name=password]")
      .type("Fake Password")
      .should("have.value", "Fake Password");

    cy.get(".submitBtn").click();

    cy.url().should("include", "/profile");

    cy.get(".logoutBtn").click();
    cy.url().should("include", "/");
  });

  it("Register screen, input details, then close", () => {
    cy.contains("Register").click();

    cy.get(".formInput[name=firstName]")
      .type("Fake First Name")
      .should("have.value", "Fake First Name");

    cy.get(".formInput[name=lastName]")
      .type("Fake Last Name")
      .should("have.value", "Fake Last Name");

    cy.get(".formInput[name=email]")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get(".formInput[name=password]")
      .type("Fake Password")
      .should("have.value", "Fake Password");
    cy.get(".closeFormBtn").click();
    cy.url().should("include", "/");
  });

  it("Register screen, input details, then chose to Login", () => {
    cy.contains("Register").click();

    cy.get(".formInput[name=firstName]")
      .type("Fake First Name")
      .should("have.value", "Fake First Name");

    cy.get(".formInput[name=lastName]")
      .type("Fake Last Name")
      .should("have.value", "Fake Last Name");

    cy.get(".formInput[name=email]")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get(".formInput[name=password]")
      .type("Fake Password")
      .should("have.value", "Fake Password");
    cy.get(".changeFormBtn").click();
    cy.url().should("include", "/");
  });


  //Add scenario if account already exists
});
