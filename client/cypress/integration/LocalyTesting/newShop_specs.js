describe("Login into Localy", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.get(".email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get(".password")
      .type("fake@password")
      .should("have.value", "fake@password");

    cy.contains("Log In").click();
  });

  it("Creat a new shop", () => {
    cy.contains("Create a new shop").click();
    cy.get(".createShopFormInput[name=name]")
      .type("Fake Name")
      .should("have.value", "Fake Name");

    cy.get(".createShopFormInput[name=category]")
      .type("Fake Category")
      .should("have.value", "Fake Category");

    cy.get(".createShopFormInput[name=address]")
      .type("Fake Address")
      .should("have.value", "Fake Address");

    cy.get(".createShopFormInput[name=telephone]")
      .type("Fake Telephone Number")
      .should("have.value", "Fake Telephone Number");

    cy.get(".createShopFormInput[name=email]")
      .type("Fake@Email")
      .should("have.value", "Fake@Email");

    cy.get(".createShopFormInput[name=website]")
      .type("Fake Website")
      .should("have.value", "Fake Website");

    cy.get(".describeShopFormInput[name=description]")
      .type("Fake Description")
      .should("have.value", "Fake Description");

    cy.get(".createShopFormInput[name=latitude]")
      .type("Fake Latitude")
      .should("have.value", "Fake Latitude");

    cy.get(".createShopFormInput[name=longitude]")
      .type("Fake Longitude")
      .should("have.value", "Fake Longitude");

    cy.contains('Place in map!').click()
    //Need to add test for 'Select Main Picture'
  });

  it("Create form without any inputs", () => {
    cy.contains("Create a new shop").click();

    cy.get("input:invalid");
    cy.get(".createShopFormInput[name=name]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
    cy.get(".createShopFormInput[name=category]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
    cy.get("input:invalid");
    cy.get(".createShopFormInput[name=address]").then(($input) => {
      expect($input[0].validationMessage).to.eq("");
    });
    cy.get(".createShopFormInput[name=telephone]").then(($input) => {
      expect($input[0].validationMessage).to.eq("");
    });
    cy.get(".createShopFormInput[name=email]").then(($input) => {
      expect($input[0].validationMessage).to.eq("");
    });
    cy.get(".createShopFormInput[name=website]").then(($input) => {
      expect($input[0].validationMessage).to.eq("");
    });
    cy.get("textarea:invalid");
    cy.get(".describeShopFormInput[name=description]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
    cy.get(".createShopFormInput[name=latitude]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
    cy.get(".createShopFormInput[name=longitude]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  //Add scenarios for pictures uploading
});
