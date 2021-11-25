/// <reference types = "Cypress"/>
describe("Card Holder POST API tests", () => {
  Cypress.config(
    "baseUrl",
    "https://api.staging.pungle.co/api/v1/card_issuing/cardholders"
  );

  const headers = {
    Authorization: Cypress.env("token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const canada_country_code = "124";
  const us_country_code = "840";

  const body_full = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "01-01-1980",
    email: "user@fakedomain.com",
    phone: "1231231234",
    postal_code: "84121",
    city: "Moonbase One",
    state: "UT",
    address1: "123 Fake Street",
    address2: "apartment 2",
    country: "840",
    sin: "",
    shipping_method: "1",
    load_amount: 100,
  };

  it("Valid country code - US", () => {
    body_full.country = us_country_code;
    cy.validateSuccess(body_full, headers);
  });

  it("Valid country code - Canada", () => {
    body_full.country = canada_country_code;
    body_full.state = "ON";
    body_full.postal_code = "A1A1A1";
    cy.validateSuccess(body_full, headers);
  });

  it("Invalid country code", () => {
    body_full.country = "1231313";
    body_full.country = "gfdg";
    cy.validateFailure(body_full, headers, "Not a valid country code");
  });

  it("Invalid state - Canada", () => {
    body_full.country = canada_country_code;
    body_full.state = "UT";
    body_full.postal_code = "A1A1A1";
    cy.validateFailure(body_full, headers, "Not a valid state or province");
  });

  it("Invalid state - US", () => {
    body_full.country = us_country_code;
    body_full.state = "BLA";
    cy.validateFailure(body_full, headers, "Not a valid state or province");
  });

  it("Invalid postal code - Canada", () => {
    body_full.country = canada_country_code;
    body_full.state = "ON";
    body_full.postal_code = "wfqwfgqwgw";
    cy.validateFailure(
      body_full,
      headers,
      "Postal code must be of the format 'A1A1A1', 'A1A-1A1' or 'A1A 1A1'"
    );
  });

  it("Invalid state (ONTARIO) - US", () => {
    body_full.country = us_country_code;
    body_full.state = "ON";
    cy.validateFailure(body_full, headers, "Not a valid state or province");
  });
});
