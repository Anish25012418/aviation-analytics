describe("Home Page and Main Layout", () => {
  beforeEach(() => {
    cy.visit("/"); // Start from homepage
  });

  it("renders the home page with hero content", () => {
    cy.get("h1").contains("FLIGHT ANALYTICS");
    cy.get("img[alt='FLIGHT ANALYTICS']").should("be.visible");
  });

  it("navigates to home on logo click", () => {
    cy.get("nav img[alt='logo']").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("should toggle sidebar and store state", () => {
    cy.get("aside").as("sidebar");

    // Initially expanded
    cy.get("@sidebar").should("have.class", "max-w-60");

    // Click toggle
    cy.get("button").click();

    // Should collapse
    cy.get("@sidebar").should("have.class", "max-w-18");

    // Check localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem("sidebar-expanded")).to.eq("false");
    });

    // Toggle back
    cy.get("button").click();
    cy.get("@sidebar").should("have.class", "max-w-60");
  });

  it("navigates via sidebar items", () => {
    cy.get("aside li").first().click();

    cy.url().should("include", "/");
  });

  it("shows tooltip when sidebar is collapsed", () => {
    cy.get("button").click(); // collapse

    cy.get("aside li").first().trigger("mouseover");

    cy.get("aside li").first().within(() => {
      cy.get("div").should("contain.text", "Home"); // Tooltip appears
    });
  });
});