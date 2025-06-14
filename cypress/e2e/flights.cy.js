describe("Flights Page", () => {
  beforeEach(() => {
    cy.visit("/flights");
  });

  it("renders the Flights Data heading", () => {
    cy.contains("h1", "Flights Data").should("be.visible");
  });

  it("renders all filters and buttons", () => {
    cy.get('input[type="date"]').should("exist");

    cy.get('input[placeholder="Select dept airport"]').should("exist");
    cy.get('input[placeholder="Select arr airport"]').should("exist");
    cy.get('input[placeholder="Select airline"]').should("exist");

    cy.get('input[placeholder="Flight No."]').should("exist");
    cy.get('select').should("exist");

    cy.contains("button", "Search").should("exist");
    cy.contains("button", "Clear").should("exist");
  });

  it("applies filters and updates table", () => {
    // Example: select 'Scheduled' from status
    cy.get('select').select("Scheduled");

    cy.contains("button", "Search").click();

    // Assert filtered result (if there's any)
    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).contains("Scheduled");
    });
  });

  it("clears filters and resets the table", () => {
    // Apply a filter first
    cy.get('select').select("Scheduled");
    cy.contains("button", "Search").click();

    // Then clear filters
    cy.contains("button", "Clear").click();

    // Should reset table to full flight list
    cy.get("table").should("be.visible");
  });

  it("renders flight data in table", () => {
    cy.get("table tbody tr").should("exist");

    cy.get("table tbody tr").first().within(() => {
      cy.get("td").eq(0).should("not.be.empty"); // Date
      cy.get("td").eq(1).should("not.be.empty"); // Airline
      cy.get("td").eq(2).should("not.be.empty"); // Flight
      cy.get("td").eq(3).should("not.be.empty"); // Departure
      cy.get("td").eq(4).should("not.be.empty"); // Arrival
      cy.get("td").eq(5).should("not.be.empty"); // Status
    });
  });

  it("changes pages using pagination", () => {
    cy.get("table tbody tr").then((rowsBefore) => {
      const firstRowText = rowsBefore.first().text();

      // Go to page 2
      cy.contains("button", "2").click();

      cy.get("table tbody tr").should("exist").first().should(($row) => {
        expect($row.text()).not.to.eq(firstRowText);
      });
    });
  });
});