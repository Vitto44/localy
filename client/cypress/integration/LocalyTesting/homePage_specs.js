describe("Login into Localy", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Login without any inputs", () => {
    cy.contains("Go to Map").click();

    cy.url().should('contain', '/map');

    cy.get(".searchBar").type('rose').should('have.value', 'rose');
    });
//Need to add test for fetch request return - could be done already for back end
//Add test scenarios for returns after entering a search

});
