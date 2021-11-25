/// <reference types = "Cypress"/>
describe("Card Holder POST API tests", () => {
  Cypress.config(
    "baseUrl",
    "https://api.staging.pungle.co/api/v1/card_issuing/cardholders"
  );

  const invalidToken = {
    Authorization: Cypress.env("invalid_token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

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

  it("Authorization Invalid Token", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: invalidToken,
      body: body_full,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body.error.code).to.equal("invalid_credentials_supplied");
    });
  });

  const empty_token = {
    Authorization: Cypress.env("empty_token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  it("Authorization Token empty", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: empty_token,
      body: body_full,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body.error.code).to.equal("invalid_credentials_supplied");
    });
  });

  const missing_token = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  it("Authorization Token missing", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: missing_token,
      body: body_full,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body.error.code).to.equal("invalid_credentials_supplied");
    });
  });
});
